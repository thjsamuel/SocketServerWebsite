import java.io.*;  
import java.net.*;  
import java.util.List;
import java.util.ArrayList;

public class SocketServer {
    public static void main(String[] args){  
        try {
            ServerSocket ss = new ServerSocket(8080); // start server at 0.0.0.0, local port 8080
            System.out.println("Server started!"); 
            while (true) { // run until termination inside loop
                try (Socket cli_s = ss.accept()) { //if client connected, proceed
                    System.out.println("Client connected, at " + cli_s.toString());
                    List<String> req_obj = extractParam(cli_s);
                    String[] requestLine = req_obj.get(0).split(" "); // GET /path HTTP1.1
                    List<String> headers = new ArrayList<String>();
                    for (int h = 2; h < req_obj.size(); h++) {
                        String header = req_obj.get(h);
                        headers.add(header);
                    }

                    String path = pathRoute(requestLine[1]);
                    File file = new File(path);
                    OutputStream clientOutput = cli_s.getOutputStream();
                    //BufferedOutputStream dataOut = new BufferedOutputStream(cli_s.getOutputStream());
                    String status = "";
                    String extension = getFileExtension(file);
                    String content_type = (extension.equals("html")) ? "text/html" : (extension.equals("css")) ? "text/css" : "text/plain";

                    if (file.exists() == true)
                    {
                        int file_len = (int)file.length();
                        byte[] file_byte = readFileData(file, file_len);
                        status = "200 OK";
                        //sendResponse(cli_s, status, content_type, file_byte, file_len, clientOutput, dataOut);
                        sendResponseNonBuffer(cli_s, status, content_type, file_byte, clientOutput);
                    }
                    else
                    {
                        // 404 not found error handling
                        byte[] notFoundContent = "<h1> File Not found :( </h1>".getBytes();
                        status = "404 Not Found";
                        content_type = "text/html";
                        sendResponseNonBuffer(cli_s, status, content_type, notFoundContent, clientOutput);
                    }
                }
            }
        }
        catch(Exception e)
        {
            System.out.println(e);
        }  
    }  

    private static List<String> extractParam(Socket cli_instance) throws IOException {
        BufferedReader buffer = new BufferedReader(new InputStreamReader(cli_instance.getInputStream()));
        List<String> req_obj = new ArrayList<String>();
        String line;
        // loop through whole request object seperated by carriage r and new lines
        do {
            line = buffer.readLine();
            req_obj.add(line);
        }
        while (!line.isBlank());

        return req_obj;
    }

    private static String pathRoute(String path) {
        if (path.equals("/"))
        {
            return "./HTML5/index.html";
        }
        return "." + path;
    }

    private static String getFileExtension(File file)
    {
        String extension = "";

        String file_name = file.getName();
        int i = file_name.lastIndexOf('.');
        int p = Math.max(file_name.lastIndexOf('/'), file_name.lastIndexOf('\\'));
        
        if (i > p) {
            extension = file_name.substring(i+1);
        }
        return extension;
    }

    private static byte[] readFileData(File file, int fileLength) throws IOException {
		FileInputStream file_in = null;
		byte[] file_byte = new byte[fileLength];
		
		try {
			file_in = new FileInputStream(file);
			file_in.read(file_byte);
		} finally {
			if (file_in != null) 
				file_in.close();
		}
		
		return file_byte;
	}

    public static byte[] readBytes(InputStream inputStream) throws IOException {
        byte[] b = new byte[1024];
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        int c;
        while ((c = inputStream.read(b)) != -1) {
            os.write(b, 0, c);
        }
        return os.toByteArray();
    }

    public static void sendResponse(Socket cli, String status, String content_type, byte[] filebyte, int filelen, OutputStream out_strm, BufferedOutputStream data_out_strm) throws IOException
    {
        out_strm.write( ("HTTP/1.1 " + status + "\r\n").getBytes());
        out_strm.write(("Content-Type: " + content_type + "\r\n").getBytes());
        out_strm.write(("Content-Length: " + filelen + "\r\n").getBytes()); 
        out_strm.write("\r\n".getBytes());
        out_strm.flush();
        data_out_strm.write(filebyte, 0, filelen);
        data_out_strm.flush();
    }

    public static void sendResponseNonBuffer(Socket cli, String status, String content_type, byte[] filebyte, OutputStream out_strm) throws IOException
    {
        out_strm.write( ("HTTP/1.1 " + status + "\r\n").getBytes());
        out_strm.write(("Content-Type: " + content_type + "\r\n").getBytes());
        out_strm.write("\r\n".getBytes());
        out_strm.write(filebyte);
        out_strm.write("\r\n\r\n".getBytes());
        out_strm.flush();
    }

}
