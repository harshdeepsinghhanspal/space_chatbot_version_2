const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  userInput.value = "";

  try {
    const response = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    addMessage("bot", data.response);
  } catch (err) {
    addMessage("bot", "❌ Failed to fetch response.");
    console.error(err);
  }
});

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerHTML = `<strong>${sender === "user" ? "You" : "SpaceBot"}:</strong><br>${text.replace(/\n/g, "<br>")}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}
