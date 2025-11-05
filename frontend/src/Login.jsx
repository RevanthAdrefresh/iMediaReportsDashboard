// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (!email || !password) {
//       setMessage("⚠️ Please fill in all fields.");
//       return;
//     }

//     // Get all users
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check credentials
//     const foundUser = users.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (!foundUser) {
//       setMessage("❌ Invalid email or password!");
//       return;
//     }

//     // Save current user session
//     localStorage.setItem("currentUser", JSON.stringify(foundUser));
//     setMessage("✅ Login successful! Redirecting...");

//     // Redirect by role
//     setTimeout(() => {
//       if (foundUser.role === "admin") navigate("/Adminpanel");
//       else if (foundUser.role === "publisher") navigate("/publisherpanel");
//       else if (foundUser.role === "advertiser") navigate("/advertiserpanel");
//       else navigate("/");
//     }, 1200);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Welcome Back 👋</h2>
//         <p style={styles.subtext}>Login to continue your dashboard</p>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               style={styles.input}
//               placeholder="Enter your email"
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               style={styles.input}
//               placeholder="Enter your password"
//             />
//           </div>

//           <button type="submit" style={styles.button}>
//             Login
//           </button>

//           {message && <p style={styles.message}>{message}</p>}
//         </form>

//         <p style={styles.signupText}>
//           Don’t have an account?{" "}
//           <a href="/signup" style={styles.link}>
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     background: "linear-gradient(135deg, #F5F9FF, #E3F2FD)",
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontFamily: "Inter, sans-serif",
//   },
//   card: {
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "16px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     width: "100%",
//     maxWidth: "400px",
//   },
//   heading: {
//     textAlign: "center",
//     fontSize: "26px",
//     fontWeight: "700",
//     marginBottom: "10px",
//     color: "#1565C0",
//   },
//   subtext: {
//     textAlign: "center",
//     color: "#666",
//     fontSize: "14px",
//     marginBottom: "25px",
//   },
//   form: { display: "flex", flexDirection: "column", gap: "18px" },
//   inputGroup: { display: "flex", flexDirection: "column" },
//   label: {
//     fontSize: "14px",
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: "5px",
//   },
//   input: {
//     padding: "12px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     fontSize: "15px",
//   },
//   button: {
//     marginTop: "10px",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     background: "linear-gradient(135deg, #1565C0, #1E88E5)",
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//   },
//   message: {
//     marginTop: "10px",
//     textAlign: "center",
//     fontSize: "14px",
//     color: "#333",
//   },
//   signupText: {
//     textAlign: "center",
//     fontSize: "14px",
//     marginTop: "20px",
//     color: "#555",
//   },
//   link: {
//     color: "#1565C0",
//     textDecoration: "none",
//     fontWeight: "600",
//   },
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      console.log(res.data,"res");

      const jwt=localStorage.setItem("jwt",JSON.stringify(res.data))
      

      const { user } = res.data;
      console.log(user,"user");
      

      setMessage("✅ Login successful! Redirecting...");

      setTimeout(() => {
        if (user.role === "admin") navigate("/Adminpanel");
        else if (user.role === "publisher") navigate("/publisherpanel");
        else if (user.role === "advertiser") navigate("/advertiserpanel");
        else navigate("/");
      }, 1200);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "❌ Invalid email or password!";
      setMessage(errMsg);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>
        <p style={styles.subtext}>Login to continue your dashboard</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </form>

        <p style={styles.signupText}>
          Don’t have an account?{" "}
          <a href="/signup" style={styles.link}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(135deg, #F5F9FF, #E3F2FD)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1565C0",
  },
  subtext: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    marginBottom: "25px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column" },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #1565C0, #1E88E5)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  message: {
    marginTop: "10px",
    textAlign: "center",
    fontSize: "14px",
    color: "#333",
  },
  signupText: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "20px",
    color: "#555",
  },
  link: {
    color: "#1565C0",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;
