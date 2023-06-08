import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

public class SocketClient {
    public static void main (String[] args)
    {
        try
        {
            InetAddress local_addr = InetAddress.getByName("localhost");
            SocketAddress des_addr = new InetSocketAddress(8084); // param if local_host is not needed as default addr is 0.0.0.0, which is wildcard addr
            Socket sock = new Socket();
            // connect does a bind ("0. 0. 0. 0", 0) by default if bind is not called
            sock.connect(des_addr, 100000); // 10 secs to timeout
            // Create input and output streams to read from and write to the server
            BufferedReader in = new BufferedReader(new InputStreamReader(sock.getInputStream()));
            PrintStream out = new PrintStream(sock.getOutputStream());
            // Follow the HTTP protocol of GET <path> HTTP/1.0 followed by an empty line
            out.println("GET " + "/" + " " + "HTTP/1.1" );
            out.println("Host:" + " " + "127.0.0.1");
            out.println();
            out.flush();

            // Read data from the server until we finish reading the document
            String line = in.readLine();
            
            while ( sock.isClosed() == false )
            {
                //System.out.println(sock.isConnected());
                // readLine() returns null if server close the network socket.
                while (line != null)
                {
                    System.out.println(line);
                    line = in.readLine();
                }
            }   

            // Close our streams
            in.close();
            out.close();
            sock.close();
        }
        catch( IOException e ) {
            e.printStackTrace();
        }
    }
}
