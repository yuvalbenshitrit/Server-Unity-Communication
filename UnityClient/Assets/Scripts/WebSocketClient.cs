using UnityEngine;
using WebSocketSharp;
using UnityEngine.UI;

public class WebSocketClient : MonoBehaviour
{
    public Image connectionIndicator;
    WebSocket ws;

    void Start()
    {
        ws = new WebSocket("ws://localhost:8080");

        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("Connected to server");
            if (connectionIndicator != null)
                connectionIndicator.color = Color.green;


            SendHandshake();
        };

        ws.OnMessage += (sender, e) =>
        {
            Debug.Log("Received: " + e.Data);

            HandleServerMessage(e.Data);
        };

        ws.OnClose += (sender, e) =>
        {
            Debug.Log("Connection closed");
            if (connectionIndicator != null)
                connectionIndicator.color = Color.red;
        };

        ws.OnError += (sender, e) =>
        {
            Debug.Log("Error: " + e.Message);
        };

        ws.Connect();
    }

    void SendHandshake()
    {
        string handshake = "{\"type\":\"handshake\"}";
        ws.Send(handshake);

        Debug.Log("Handshake sent");
    }

    void SendResponse()
    {
        string response = "{\"type\":\"response\",\"result\":\"pong\"}";
        ws.Send(response);

        Debug.Log("Response sent");
    }

    void HandleServerMessage(string message)
    {
        if (message.Contains("command"))
        {
            Debug.Log("Ping command received");
            SendResponse();
        }
    }

    void OnApplicationQuit()
    {
        if (ws != null)
            ws.Close();
    }
}