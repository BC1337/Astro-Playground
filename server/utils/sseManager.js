// utils/sseManager.js
class SSEManager {
    constructor() {
      this.connections = new Set();
    }
  
    // Method to add new SSE connection
    addConnection(res) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
  
      this.connections.add(res);
    }
  
    // Method to remove SSE connection
    removeConnection(res) {
      this.connections.delete(res);
    }
  
    // Method to send SSE event to connected clients
    sendEvent(event, data) {
      this.connections.forEach((res) => {
        res.write(`event: ${event}\n`);
        res.write(`data: ${data}\n\n`);
      });
    }
  }
  
  // Create a singleton instance of SSEManager
  const sseManager = new SSEManager();
  
  export default sseManager;
  