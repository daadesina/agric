// ----------------------
// AUTH (Signup & Login)
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const postForm = document.getElementById("postForm");
  const advisoryForm = document.getElementById("advisoryForm");

  // Signup
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.email === email && user.password === password) {
        alert("Login successful!");
        window.location.href = "marketplace.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  // ----------------------
  // MARKETPLACE
  // ----------------------
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("productName").value;
      const price = document.getElementById("productPrice").value;
      const desc = document.getElementById("productDesc").value;

      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.push({ name, price, desc });
      localStorage.setItem("posts", JSON.stringify(posts));

      renderPosts(true);

      postForm.reset();
    });

    function renderPosts(showAlert = false) {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      const container = document.getElementById("marketList");
      if (!container) return;

      container.innerHTML = "";
      posts.forEach((p) => {
        const div = document.createElement("div");
        div.className = "p-4 bg-white rounded shadow";
        div.innerHTML = `<h3 class="font-bold">${p.name}</h3>
                         <p>Price: ${p.price}</p>
                         <p>${p.desc}</p>`;
        container.appendChild(div);
      });

      if (showAlert) alert("Posted successfully!");
    }

    renderPosts();
  }

  // ----------------------
  // ADVISORY
  // ----------------------
  const defaultAdvisory = [
    { title: "Soil Care", content: "Healthy soil = healthy crops. Rotate crops to balance nutrients." },
    { title: "Water Management", content: "Water early morning or evening to reduce evaporation." },
    { title: "Pest Control", content: "Use integrated pest management for cost savings + environment." },
    { title: "Motivation", content: "A farmer is a magician who produces money from the mud!" },
  ];

  function renderAdvisory() {
    const container = document.getElementById("advisoryList");
    if (!container) return;

    container.innerHTML = "";
    const userAdvisory = JSON.parse(localStorage.getItem("advisoryPosts")) || [];
    const allAdvisory = [...defaultAdvisory, ...userAdvisory];

    allAdvisory.forEach((a) => {
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded shadow hover:shadow-md transition";
      div.innerHTML = `<h3 class="text-lg font-bold mb-2">${a.title}</h3>
                       <p class="text-gray-700">${a.content}</p>`;
      container.appendChild(div);
    });
  }

  if (advisoryForm) {
    advisoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("advisoryTitle").value.trim();
      const content = document.getElementById("advisoryContent").value.trim();

      if (title && content) {
        const posts = JSON.parse(localStorage.getItem("advisoryPosts")) || [];
        posts.push({ title, content });
        localStorage.setItem("advisoryPosts", JSON.stringify(posts));

        advisoryForm.reset();
        renderAdvisory();
        alert("Advice posted successfully ✅");
      } else {
        alert("Please enter both a title and content.");
      }
    });
  }

  renderAdvisory();

  // ----------------------
  // EDUCATION
  // ----------------------
  const courses = [
    { id: 1, title: "Agricultural Economics", duration: "6 weeks", desc: "Learn economics in agriculture, market analysis & farm management." },
    { id: 2, title: "Fundamentals of Agriculture", duration: "4 weeks", desc: "Introduction to soil, crops & farming systems." },
    { id: 3, title: "Livestock Management", duration: "6 weeks", desc: "Feeding, housing & health practices for livestock." },
    { id: 4, title: "Crop Diseases & Protection", duration: "4 weeks", desc: "Identify & manage common crop diseases." },
    { id: 5, title: "Agric Tech & Innovation", duration: "6 weeks", desc: "Explore IoT & modern innovations in agriculture." },
  ];

  function renderCourses() {
    const container = document.getElementById("courseList");
    if (!container) return;

    container.innerHTML = "";
    const enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    courses.forEach((c) => {
      const isEnrolled = enrolled.includes(c.id);
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";
      div.innerHTML = `<h3 class="text-lg font-bold mb-2">${c.title}</h3>
                       <p class="text-gray-600 mb-2">${c.desc}</p>
                       <p class="text-sm text-gray-500 mb-4">Duration: ${c.duration}</p>
                       <button onclick="enrollCourse(${c.id})"
                         class="w-full ${isEnrolled ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded">
                         ${isEnrolled ? "Enrolled ✓" : "Enroll"}
                       </button>`;
      container.appendChild(div);
    });
  }

  window.enrollCourse = function (id) {
    let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    if (!enrolled.includes(id)) {
      enrolled.push(id);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
      alert("Enrolled successfully 🎉");
      renderCourses();
    }
  };

  renderCourses();
});
