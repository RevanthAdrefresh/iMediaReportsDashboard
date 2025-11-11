// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";

// // // // // const UserManagement = () => {
// // // // //   const [users, setUsers] = useState([]);
// // // // //   const [formData, setFormData] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     password: "",
// // // // //     role: "publisher",
// // // // //   });
// // // // //   const [editUserId, setEditUserId] = useState(null);

// // // // //   const token = JSON.parse(localStorage.getItem("jwt"))?.token;

// // // // //   // ✅ Fetch users on mount
// // // // //   useEffect(() => {
// // // // //     fetchUsers();
// // // // //   }, []);

// // // // //   const fetchUsers = async () => {
// // // // //     try {
// // // // //       const res = await axios.get("http://localhost:5000/api/getallusers", {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });
// // // // //       setUsers(res.data);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching users:", err.response?.data || err.message);
// // // // //     }
// // // // //   };

// // // // //   // ✅ Add or Edit user
// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       if (editUserId) {
// // // // //         await axios.put(
// // // // //           `http://localhost:5000/api/updateusers/${editUserId}`,formData);


// // // // //       } else {
// // // // //         await axios.post("http://localhost:5000/api/signup", formData);
// // // // //       }
// // // // //       fetchUsers();
// // // // //       setFormData({ name: "", email: "", password: "", role: "publisher" });
// // // // //       setEditUserId(null);
// // // // //     } catch (err) {
// // // // //       console.error("Error saving user:", err.response?.data || err.message);
// // // // //     }
// // // // //   };

// // // // //   // ✅ Delete user
// // // // //   const handleDelete = async (id) => {
// // // // //     if (!window.confirm("Are you sure you want to delete this user?")) return;
// // // // //     try {
// // // // //       await axios.delete(`http://localhost:5000/api/deleteuser/${id}`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });
// // // // //       fetchUsers();
// // // // //     } catch (err) {
// // // // //       console.error("Error deleting user:", err.response?.data || err.message);
// // // // //     }
// // // // //   };

// // // // //   // ✅ Edit user
// // // // //   const handleEdit = (user) => {
// // // // //     setFormData({
// // // // //       name: user.name,
// // // // //       email: user.email,
// // // // //       password: "",
// // // // //       role: user.role || "publisher",
// // // // //     });
// // // // //     setEditUserId(user._id);
// // // // //   };

// // // // //   return (
// // // // //     <div style={styles.container}>
// // // // //       <h2 style={styles.heading}>👥 User Management</h2>

// // // // //       <form onSubmit={handleSubmit} style={styles.form}>
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Name"
// // // // //           value={formData.name}
// // // // //           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // // // //           required
// // // // //           style={styles.input}
// // // // //         />
// // // // //         <input
// // // // //           type="email"
// // // // //           placeholder="Email"
// // // // //           value={formData.email}
// // // // //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // // // //           required
// // // // //           style={styles.input}
// // // // //         />
// // // // //         <input
// // // // //           type="password"
// // // // //           placeholder="Password"
// // // // //           value={formData.password}
// // // // //           onChange={(e) =>
// // // // //             setFormData({ ...formData, password: e.target.value })
// // // // //           }
// // // // //           required={!editUserId}
// // // // //           style={styles.input}
// // // // //         />
// // // // //         <select
// // // // //           value={formData.role}
// // // // //           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
// // // // //           style={styles.select}
// // // // //         >
// // // // //           <option value="publisher">Publisher</option>
// // // // //           <option value="advertiser">Advertiser</option>
// // // // //           <option value="admin">Admin</option>
// // // // //         </select>
// // // // //         <button type="submit" style={styles.addButton}>
// // // // //           {editUserId ? "Update" : "Add"}
// // // // //         </button>
// // // // //       </form>

// // // // //       <table style={styles.table}>
// // // // //         <thead>
// // // // //           <tr>
// // // // //             <th>Name</th>
// // // // //             <th>Email</th>
// // // // //             <th>Role</th>
// // // // //             <th style={{ textAlign: "center" }}>Action</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {users.length === 0 ? (
// // // // //             <tr>
// // // // //               <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
// // // // //                 No Users Found
// // // // //               </td>
// // // // //             </tr>
// // // // //           ) : (
// // // // //             users.map((user) => (
// // // // //               <tr key={user._id}>
// // // // //                 <td>{user.name}</td>
// // // // //                 <td>{user.email}</td>
// // // // //                 <td>{user.role}</td>
// // // // //                 <td style={{ textAlign: "center" }}>
// // // // //                   <button
// // // // //                     style={styles.editButton}
// // // // //                     onClick={() => handleEdit(user)}
// // // // //                   >
// // // // //                     ✏️ Edit
// // // // //                   </button>
// // // // //                   <button
// // // // //                     style={styles.deleteButton}
// // // // //                     onClick={() => handleDelete(user._id)}
// // // // //                   >
// // // // //                     🗑 Delete
// // // // //                   </button>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ))
// // // // //           )}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const styles = {
// // // // //   container: {
// // // // //     padding: "20px",
// // // // //     background: "#fff",
// // // // //     borderRadius: "10px",
// // // // //     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
// // // // //   },
// // // // //   heading: {
// // // // //     marginBottom: "15px",
// // // // //   },
// // // // //   form: {
// // // // //     display: "flex",
// // // // //     gap: "10px",
// // // // //     marginBottom: "20px",
// // // // //   },
// // // // //   input: {
// // // // //     padding: "8px",
// // // // //     border: "1px solid #ccc",
// // // // //     borderRadius: "5px",
// // // // //     flex: 1,
// // // // //   },
// // // // //   select: {
// // // // //     padding: "8px",
// // // // //     border: "1px solid #ccc",
// // // // //     borderRadius: "5px",
// // // // //   },
// // // // //   addButton: {
// // // // //     background: "#00c4a7",
// // // // //     color: "#fff",
// // // // //     border: "none",
// // // // //     borderRadius: "5px",
// // // // //     padding: "8px 16px",
// // // // //     cursor: "pointer",
// // // // //   },
// // // // //   table: {
// // // // //     width: "100%",
// // // // //     borderCollapse: "collapse",
// // // // //   },
// // // // //   editButton: {
// // // // //     background: "#ffc107",
// // // // //     border: "none",
// // // // //     padding: "5px 10px",
// // // // //     marginRight: "5px",
// // // // //     borderRadius: "4px",
// // // // //     cursor: "pointer",
// // // // //   },
// // // // //   deleteButton: {
// // // // //     background: "#ff5b5b",
// // // // //     border: "none",
// // // // //     padding: "5px 10px",
// // // // //     borderRadius: "4px",
// // // // //     cursor: "pointer",
// // // // //     color: "#fff",
// // // // //   },
// // // // // };

// // // // // export default UserManagement;


// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";

// // // // const UserManagement = () => {
// // // //   const [users, setUsers] = useState([]);
// // // //   const [formData, setFormData] = useState({
// // // //     name: "",
// // // //     email: "",
// // // //     password: "",
// // // //     role: "publisher",
// // // //   });
// // // //   const [editUserId, setEditUserId] = useState(null);

// // // //   const token = JSON.parse(localStorage.getItem("jwt"))?.token;

// // // //   useEffect(() => {
// // // //     fetchUsers();
// // // //   }, []);

// // // //   const fetchUsers = async () => {
// // // //     try {
// // // //       const res = await axios.get("http://localhost:5000/api/getallusers", {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });
// // // //       setUsers(res.data);
// // // //     } catch (err) {
// // // //       console.error("Error fetching users:", err.response?.data || err.message);
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       if (editUserId) {
// // // //         await axios.put(
// // // //           `http://localhost:5000/api/updateusers/${editUserId}`,
// // // //           formData
// // // //         );
// // // //       } else {
// // // //         await axios.post("http://localhost:5000/api/signup", formData);
// // // //       }
// // // //       fetchUsers();
// // // //       setFormData({ name: "", email: "", password: "", role: "publisher" });
// // // //       setEditUserId(null);
// // // //     } catch (err) {
// // // //       console.error("Error saving user:", err.response?.data || err.message);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if (!window.confirm("Are you sure you want to delete this user?")) return;
// // // //     try {
// // // //       await axios.delete(`http://localhost:5000/api/deleteuser/${id}`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });
// // // //       fetchUsers();
// // // //     } catch (err) {
// // // //       console.error("Error deleting user:", err.response?.data || err.message);
// // // //     }
// // // //   };

// // // //   const handleEdit = (user) => {
// // // //     setFormData({
// // // //       name: user.name,
// // // //       email: user.email,
// // // //       password: "",
// // // //       role: user.role || "publisher",
// // // //     });
// // // //     setEditUserId(user._id);
// // // //   };

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <h2 style={styles.heading}>👥 User Management</h2>

// // // //       <form onSubmit={handleSubmit} style={styles.form}>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Name"
// // // //           value={formData.name}
// // // //           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // // //           required
// // // //           style={styles.input}
// // // //         />
// // // //         <input
// // // //           type="email"
// // // //           placeholder="Email"
// // // //           value={formData.email}
// // // //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // // //           required
// // // //           style={styles.input}
// // // //         />
// // // //         <input
// // // //           type="password"
// // // //           placeholder="Password"
// // // //           value={formData.password}
// // // //           onChange={(e) =>
// // // //             setFormData({ ...formData, password: e.target.value })
// // // //           }
// // // //           required={!editUserId}
// // // //           style={styles.input}
// // // //         />
// // // //         <select
// // // //           value={formData.role}
// // // //           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
// // // //           style={styles.select}
// // // //         >
// // // //           <option value="publisher">Publisher</option>
// // // //           <option value="advertiser">Advertiser</option>
// // // //           <option value="admin">Admin</option>
// // // //         </select>
// // // //         <button type="submit" style={styles.addButton}>
// // // //           {editUserId ? "Update" : "Add"}
// // // //         </button>
// // // //       </form>

// // // //       <div style={styles.tableWrapper}>
// // // //         <table style={styles.table}>
// // // //           <thead>
// // // //             <tr>
// // // //               <th style={styles.th}>Name</th>
// // // //               <th style={styles.th}>Email</th>
// // // //               <th style={styles.th}>Role</th>
// // // //               <th style={styles.th}>Actions</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {users.length === 0 ? (
// // // //               <tr>
// // // //                 <td colSpan="4" style={styles.noData}>
// // // //                   No Users Found
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               users.map((user, i) => (
// // // //                 <tr key={user._id} style={i % 2 ? styles.rowAlt : styles.row}>
// // // //                   <td style={styles.td}>{user.name}</td>
// // // //                   <td style={styles.td}>{user.email}</td>
// // // //                   <td style={styles.td}>
// // // //                     <span
// // // //                       style={{
// // // //                         ...styles.roleBadge,
// // // //                         backgroundColor:
// // // //                           user.role === "admin"
// // // //                             ? "#2563eb"
// // // //                             : user.role === "advertiser"
// // // //                             ? "#10b981"
// // // //                             : "#f59e0b",
// // // //                       }}
// // // //                     >
// // // //                       {user.role}
// // // //                     </span>
// // // //                   </td>
// // // //                   <td style={styles.tdAction}>
// // // //                     <button
// // // //                       style={styles.editButton}
// // // //                       onClick={() => handleEdit(user)}
// // // //                     >
// // // //                       ✏️ Edit
// // // //                     </button>
// // // //                     <button
// // // //                       style={styles.deleteButton}
// // // //                       onClick={() => handleDelete(user._id)}
// // // //                     >
// // // //                       🗑 Delete
// // // //                     </button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // 🔥 Enhanced internal CSS
// // // // const styles = {
// // // //   container: {
// // // //     background: "#fff",
// // // //     padding: "30px",
// // // //     borderRadius: "12px",
// // // //     boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
// // // //     maxWidth: "1000px",
// // // //     margin: "auto",
// // // //     fontFamily: "Inter, sans-serif",
// // // //   },
// // // //   heading: {
// // // //     fontSize: "24px",
// // // //     fontWeight: "bold",
// // // //     marginBottom: "20px",
// // // //     color: "#082f3d",
// // // //   },
// // // //   form: {
// // // //     display: "flex",
// // // //     flexWrap: "wrap",
// // // //     gap: "10px",
// // // //     marginBottom: "20px",
// // // //   },
// // // //   input: {
// // // //     flex: "1",
// // // //     padding: "10px",
// // // //     border: "1px solid #ccc",
// // // //     borderRadius: "6px",
// // // //     fontSize: "14px",
// // // //   },
// // // //   select: {
// // // //     padding: "10px",
// // // //     border: "1px solid #ccc",
// // // //     borderRadius: "6px",
// // // //     fontSize: "14px",
// // // //   },
// // // //   addButton: {
// // // //     background: "#10b981",
// // // //     color: "#fff",
// // // //     border: "none",
// // // //     borderRadius: "6px",
// // // //     padding: "10px 18px",
// // // //     cursor: "pointer",
// // // //     fontWeight: "600",
// // // //   },
// // // //   tableWrapper: {
// // // //     overflowX: "auto",
// // // //   },
// // // //   table: {
// // // //     width: "100%",
// // // //     borderCollapse: "collapse",
// // // //     minWidth: "600px",
// // // //   },
// // // //   th: {
// // // //     background: "#082f3d",
// // // //     color: "#fff",
// // // //     padding: "12px",
// // // //     textAlign: "left",
// // // //     fontWeight: "600",
// // // //   },
// // // //   td: {
// // // //     padding: "12px",
// // // //     borderBottom: "1px solid #ddd",
// // // //   },
// // // //   tdAction: {
// // // //     padding: "12px",
// // // //     textAlign: "center",
// // // //   },
// // // //   row: {
// // // //     background: "#fff",
// // // //   },
// // // //   rowAlt: {
// // // //     background: "#f9fafb",
// // // //   },
// // // //   editButton: {
// // // //     background: "#facc15",
// // // //     border: "none",
// // // //     padding: "6px 12px",
// // // //     marginRight: "6px",
// // // //     borderRadius: "4px",
// // // //     cursor: "pointer",
// // // //     color: "#000",
// // // //     fontWeight: "500",
// // // //   },
// // // //   deleteButton: {
// // // //     background: "#ef4444",
// // // //     border: "none",
// // // //     padding: "6px 12px",
// // // //     borderRadius: "4px",
// // // //     cursor: "pointer",
// // // //     color: "#fff",
// // // //     fontWeight: "500",
// // // //   },
// // // //   noData: {
// // // //     textAlign: "center",
// // // //     color: "#888",
// // // //     padding: "20px",
// // // //   },
// // // //   roleBadge: {
// // // //     color: "#fff",
// // // //     padding: "4px 10px",
// // // //     borderRadius: "20px",
// // // //     fontSize: "12px",
// // // //     fontWeight: "500",
// // // //     textTransform: "capitalize",
// // // //   },
// // // // };

// // // // export default UserManagement;


// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";

// // // const UserManagement = () => {
// // //   const [users, setUsers] = useState([]);
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     password: "",
// // //     role: "publisher",
// // //   });
// // //   const [editUserId, setEditUserId] = useState(null);

// // //   const token = JSON.parse(localStorage.getItem("jwt"))?.token;

// // //   useEffect(() => {
// // //     fetchUsers();
// // //   }, []);

// // //   const fetchUsers = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:5000/api/getallusers", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setUsers(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching users:", err.response?.data || err.message);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       if (editUserId) {
// // //         await axios.put(
// // //           `http://localhost:5000/api/updateusers/${editUserId}`,
// // //           formData
// // //         );
// // //       } else {
// // //         await axios.post("http://localhost:5000/api/signup", formData);
// // //       }
// // //       fetchUsers();
// // //       setFormData({ name: "", email: "", password: "", role: "publisher" });
// // //       setEditUserId(null);
// // //     } catch (err) {
// // //       console.error("Error saving user:", err.response?.data || err.message);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Are you sure you want to delete this user?")) return;
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/deleteuser/${id}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       fetchUsers();
// // //     } catch (err) {
// // //       console.error("Error deleting user:", err.response?.data || err.message);
// // //     }
// // //   };

// // //   const handleEdit = (user) => {
// // //     setFormData({
// // //       name: user.name,
// // //       email: user.email,
// // //       password: "",
// // //       role: user.role || "publisher",
// // //     });
// // //     setEditUserId(user._id);
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2 style={styles.heading}>👥 User Management</h2>

// // //       <form onSubmit={handleSubmit} style={styles.form}>
// // //         <input
// // //           type="text"
// // //           placeholder="Name"
// // //           value={formData.name}
// // //           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //           required
// // //           style={styles.input}
// // //         />
// // //         <input
// // //           type="email"
// // //           placeholder="Email"
// // //           value={formData.email}
// // //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //           required
// // //           style={styles.input}
// // //         />
// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={formData.password}
// // //           onChange={(e) =>
// // //             setFormData({ ...formData, password: e.target.value })
// // //           }
// // //           required={!editUserId}
// // //           style={styles.input}
// // //         />
// // //         <select
// // //           value={formData.role}
// // //           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
// // //           style={styles.select}
// // //         >
// // //           <option value="publisher">Publisher</option>
// // //           <option value="advertiser">Advertiser</option>
// // //           <option value="admin">Admin</option>
// // //         </select>
// // //         <button type="submit" style={styles.addButton}>
// // //           {editUserId ? "Update" : "Add"}
// // //         </button>
// // //       </form>

// // //       <div style={styles.tableWrapper}>
// // //         <table style={styles.table}>
// // //           <thead>
// // //             <tr>
// // //               <th style={styles.th}>Name</th>
// // //               <th style={styles.th}>Email</th>
// // //               <th style={styles.th}>Role</th>
// // //               <th style={styles.th}>Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {users.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan="4" style={styles.noData}>
// // //                   No Users Found
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               users.map((user, i) => (
// // //                 <tr key={user._id}>
// // //                   <td style={styles.td}>{user.name}</td>
// // //                   <td style={styles.td}>{user.email}</td>
// // //                   <td style={styles.td}>
// // //                     <span
// // //                       style={{
// // //                         ...styles.roleBadge,
// // //                         backgroundColor:
// // //                           user.role === "admin"
// // //                             ? "#2563eb"
// // //                             : user.role === "advertiser"
// // //                             ? "#10b981"
// // //                             : "#f59e0b",
// // //                       }}
// // //                     >
// // //                       {user.role}
// // //                     </span>
// // //                   </td>
// // //                   <td style={styles.tdAction}>
// // //                     <button
// // //                       style={styles.editButton}
// // //                       onClick={() => handleEdit(user)}
// // //                     >
// // //                       ✏️ Edit
// // //                     </button>
// // //                     <button
// // //                       style={styles.deleteButton}
// // //                       onClick={() => handleDelete(user._id)}
// // //                     >
// // //                       🗑 Delete
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // 🔥 Tight grid look: all borders visible, solid lines, cell spacing
// // // const styles = {
// // //   container: {
// // //     background: "#fff",
// // //     padding: "30px",
// // //     borderRadius: "12px",
// // //     boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
// // //     maxWidth: "1000px",
// // //     margin: "auto",
// // //     fontFamily: "Inter, sans-serif",
// // //   },
// // //   heading: {
// // //     fontSize: "24px",
// // //     fontWeight: "bold",
// // //     marginBottom: "20px",
// // //     color: "#082f3d",
// // //   },
// // //   form: {
// // //     display: "flex",
// // //     flexWrap: "wrap",
// // //     gap: "10px",
// // //     marginBottom: "20px",
// // //   },
// // //   input: {
// // //     flex: "1",
// // //     padding: "10px",
// // //     border: "1px solid #ccc",
// // //     borderRadius: "6px",
// // //     fontSize: "14px",
// // //   },
// // //   select: {
// // //     padding: "10px",
// // //     border: "1px solid #ccc",
// // //     borderRadius: "6px",
// // //     fontSize: "14px",
// // //   },
// // //   addButton: {
// // //     background: "#10b981",
// // //     color: "#fff",
// // //     border: "none",
// // //     borderRadius: "6px",
// // //     padding: "10px 18px",
// // //     cursor: "pointer",
// // //     fontWeight: "600",
// // //   },
// // //   tableWrapper: {
// // //     overflowX: "auto",
// // //   },
// // //   table: {
// // //     width: "100%",
// // //     borderCollapse: "collapse",
// // //     minWidth: "600px",
// // //     border: "2px solid #ddd",
// // //   },
// // //   th: {
// // //     background: "#082f3d",
// // //     color: "#fff",
// // //     padding: "12px",
// // //     textAlign: "left",
// // //     fontWeight: "600",
// // //     border: "1px solid #ccc",
// // //   },
// // //   td: {
// // //     padding: "12px",
// // //     border: "1px solid #ccc",
// // //     textAlign: "left",
// // //     verticalAlign: "middle",
// // //   },
// // //   tdAction: {
// // //     padding: "12px",
// // //     border: "1px solid #ccc",
// // //     textAlign: "center",
// // //   },
// // //   editButton: {
// // //     background: "#facc15",
// // //     border: "none",
// // //     padding: "6px 12px",
// // //     marginRight: "6px",
// // //     borderRadius: "4px",
// // //     cursor: "pointer",
// // //     color: "#000",
// // //     fontWeight: "500",
// // //   },
// // //   deleteButton: {
// // //     background: "#ef4444",
// // //     border: "none",
// // //     padding: "6px 12px",
// // //     borderRadius: "4px",
// // //     cursor: "pointer",
// // //     color: "#fff",
// // //     fontWeight: "500",
// // //   },
// // //   noData: {
// // //     textAlign: "center",
// // //     color: "#888",
// // //     padding: "20px",
// // //     border: "1px solid #ccc",
// // //   },
// // //   roleBadge: {
// // //     color: "#fff",
// // //     padding: "4px 10px",
// // //     borderRadius: "20px",
// // //     fontSize: "12px",
// // //     fontWeight: "500",
// // //     textTransform: "capitalize",
// // //   },
// // // };

// // // export default UserManagement;

// // import React, { useState, useEffect, useContext } from "react";
// // import axios from "axios";
// // import { ThemeContext } from "../ThemeSettings/ThemeContext"; // ✅ Import theme context

// // const UserManagement = () => {
// //   const [users, setUsers] = useState([]);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     role: "publisher",
// //   });
// //   const [editUserId, setEditUserId] = useState(null);

// //   const { theme } = useContext(ThemeContext); // ✅ Get current theme
// //   const token = JSON.parse(localStorage.getItem("jwt"))?.token;

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/getallusers", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUsers(res.data);
// //     } catch (err) {
// //       console.error("Error fetching users:", err.response?.data || err.message);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (editUserId) {
// //         await axios.put(
// //           `http://localhost:5000/api/updateusers/${editUserId}`,
// //           formData
// //         );
// //       } else {
// //         await axios.post("http://localhost:5000/api/signup", formData);
// //       }
// //       fetchUsers();
// //       setFormData({ name: "", email: "", password: "", role: "publisher" });
// //       setEditUserId(null);
// //     } catch (err) {
// //       console.error("Error saving user:", err.response?.data || err.message);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this user?")) return;
// //     try {
// //       await axios.delete(`http://localhost:5000/api/deleteuser/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       fetchUsers();
// //     } catch (err) {
// //       console.error("Error deleting user:", err.response?.data || err.message);
// //     }
// //   };

// //   const handleEdit = (user) => {
// //     setFormData({
// //       name: user.name,
// //       email: user.email,
// //       password: "",
// //       role: user.role || "publisher",
// //     });
// //     setEditUserId(user._id);
// //   };

// //   // 🎨 Dynamic theme-based colors
// //   const isDark = theme === "dark";
// //   const themeColors = {
// //     containerBg: isDark ? "#1e293b" : "#fff",
// //     headingColor: isDark ? "#e2e8f0" : "#082f3d",
// //     borderColor: isDark ? "#334155" : "#ccc",
// //     tableHeaderBg: isDark ? "#0f172a" : "#082f3d",
// //     tableHeaderText: "#fff",
// //     tableRowBg: isDark ? "#1e293b" : "#fff",
// //     textColor: isDark ? "#e2e8f0" : "#333",
// //   };

// //   return (
// //     <div
// //       style={{
// //         ...styles.container,
// //         background: themeColors.containerBg,
// //         color: themeColors.textColor,
// //         borderColor: themeColors.borderColor,
// //       }}
// //     >
// //       <h2
// //         style={{
// //           ...styles.heading,
// //           color: themeColors.headingColor,
// //         }}
// //       >
// //         👥 User Management
// //       </h2>

// //       {/* ✅ Add / Edit Form */}
// //       <form onSubmit={handleSubmit} style={styles.form}>
// //         <input
// //           type="text"
// //           placeholder="Name"
// //           value={formData.name}
// //           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //           required
// //           style={{
// //             ...styles.input,
// //             background: isDark ? "#0f172a" : "#fff",
// //             color: themeColors.textColor,
// //             borderColor: themeColors.borderColor,
// //           }}
// //         />
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //           required
// //           style={{
// //             ...styles.input,
// //             background: isDark ? "#0f172a" : "#fff",
// //             color: themeColors.textColor,
// //             borderColor: themeColors.borderColor,
// //           }}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={(e) =>
// //             setFormData({ ...formData, password: e.target.value })
// //           }
// //           required={!editUserId}
// //           style={{
// //             ...styles.input,
// //             background: isDark ? "#0f172a" : "#fff",
// //             color: themeColors.textColor,
// //             borderColor: themeColors.borderColor,
// //           }}
// //         />
// //         <select
// //           value={formData.role}
// //           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
// //           style={{
// //             ...styles.select,
// //             background: isDark ? "#0f172a" : "#fff",
// //             color: themeColors.textColor,
// //             borderColor: themeColors.borderColor,
// //           }}
// //         >
// //           <option value="publisher">Publisher</option>
// //           <option value="advertiser">Advertiser</option>
// //           <option value="admin">Admin</option>
// //         </select>
// //         <button type="submit" style={styles.addButton}>
// //           {editUserId ? "Update" : "Add"}
// //         </button>
// //       </form>

// //       {/* ✅ Users Table */}
// //       <div style={styles.tableWrapper}>
// //         <table style={{ ...styles.table, borderColor: themeColors.borderColor }}>
// //           <thead>
// //             <tr>
// //               {["Name", "Email", "Role", "Actions"].map((col) => (
// //                 <th
// //                   key={col}
// //                   style={{
// //                     ...styles.th,
// //                     background: themeColors.tableHeaderBg,
// //                     color: themeColors.tableHeaderText,
// //                     borderColor: themeColors.borderColor,
// //                   }}
// //                 >
// //                   {col}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {users.length === 0 ? (
// //               <tr>
// //                 <td
// //                   colSpan="4"
// //                   style={{
// //                     ...styles.noData,
// //                     color: themeColors.textColor,
// //                     background: themeColors.tableRowBg,
// //                   }}
// //                 >
// //                   No Users Found
// //                 </td>
// //               </tr>
// //             ) : (
// //               users.map((user) => (
// //                 <tr
// //                   key={user._id}
// //                   style={{
// //                     background: themeColors.tableRowBg,
// //                     color: themeColors.textColor,
// //                   }}
// //                 >
// //                   <td style={styles.td}>{user.name}</td>
// //                   <td style={styles.td}>{user.email}</td>
// //                   <td style={styles.td}>
// //                     <span
// //                       style={{
// //                         ...styles.roleBadge,
// //                         backgroundColor:
// //                           user.role === "admin"
// //                             ? "#2563eb"
// //                             : user.role === "advertiser"
// //                             ? "#10b981"
// //                             : "#f59e0b",
// //                       }}
// //                     >
// //                       {user.role}
// //                     </span>
// //                   </td>
// //                   <td style={styles.tdAction}>
// //                     <button
// //                       style={styles.editButton}
// //                       onClick={() => handleEdit(user)}
// //                     >
// //                       ✏️ Edit
// //                     </button>
// //                     <button
// //                       style={styles.deleteButton}
// //                       onClick={() => handleDelete(user._id)}
// //                     >
// //                       🗑 Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // // ✅ Styles
// // const styles = {
// // container: {
// //   width: "100%",        
// //   maxWidth: "100%",     
// //   margin: 0,
// //   padding: "30px",
// //   borderRadius: "12px",
// //   boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
// //   fontFamily: "Inter, sans-serif",
// //   transition: "background 0.3s, color 0.3s",
// // },

// //   heading: {
// //     fontSize: "24px",
// //     fontWeight: "bold",
// //     marginBottom: "20px",
// //   },
// //   form: {
// //     display: "flex",
// //     flexWrap: "wrap",
// //     gap: "10px",
// //     marginBottom: "20px",
// //   },
// //   input: {
// //     flex: "1",
// //     padding: "10px",
// //     border: "1px solid #ccc",
// //     borderRadius: "6px",
// //     fontSize: "14px",
// //   },
// //   select: {
// //     padding: "10px",
// //     border: "1px solid #ccc",
// //     borderRadius: "6px",
// //     fontSize: "14px",
// //   },
// //   addButton: {
// //     background: "#10b981",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "6px",
// //     padding: "10px 18px",
// //     cursor: "pointer",
// //     fontWeight: "600",
// //   },
// //   tableWrapper: {
// //     overflowX: "auto",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     minWidth: "600px",
// //     border: "2px solid #ddd",
// //   },
// //   th: {
// //     padding: "12px",
// //     textAlign: "left",
// //     fontWeight: "600",
// //     border: "1px solid #ccc",
// //   },
// //   td: {
// //     padding: "12px",
// //     border: "1px solid #ccc",
// //     textAlign: "left",
// //   },
// //   tdAction: {
// //     padding: "12px",
// //     border: "1px solid #ccc",
// //     textAlign: "center",
// //   },
// //   editButton: {
// //     background: "#facc15",
// //     border: "none",
// //     padding: "6px 12px",
// //     marginRight: "6px",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     color: "#000",
// //     fontWeight: "500",
// //   },
// //   deleteButton: {
// //     background: "#ef4444",
// //     border: "none",
// //     padding: "6px 12px",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     color: "#fff",
// //     fontWeight: "500",
// //   },
// //   noData: {
// //     textAlign: "center",
// //     padding: "20px",
// //     fontStyle: "italic",
// //   },
// //   roleBadge: {
// //     color: "#fff",
// //     padding: "4px 10px",
// //     borderRadius: "20px",
// //     fontSize: "12px",
// //     fontWeight: "500",
// //     textTransform: "capitalize",
// //   },
// // };

// // export default UserManagement;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { ThemeContext } from "../ThemeSettings/ThemeContext"; // ✅ Import theme context

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [blockedUsers, setBlockedUsers] = useState([]);   // ✅ NEW
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "publisher",
//   });
//   const [editUserId, setEditUserId] = useState(null);

//   const { theme } = useContext(ThemeContext);
//   const token = JSON.parse(localStorage.getItem("jwt"))?.token;

//   useEffect(() => {
//     fetchUsers();
//     fetchBlockedUsers();   // ✅ NEW
//   }, []);

//   /* ✅ Fetch Users */
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/getallusers", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   /* ✅ Fetch Blocked Users */
//   const fetchBlockedUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/blocked-users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBlockedUsers(res.data.blockedUsers || []);
//     } catch (err) {
//       console.error("Error fetching blocked users:", err);
//     }
//   };

//   /* ✅ Check User Blocked */
//   const isUserBlocked = (name) => {
//     return blockedUsers.some((u) => u.username === name && u.blocked);
//   };

//   /* ✅ Block User */
//   const handleBlock = async (name) => {
//     try {
//       await axios.post(
//         `http://localhost:5000/api/block-user/${name}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchBlockedUsers();
//       alert(`${name} Blocked`);
//     } catch (err) {
//       console.error("Block error:", err);
//     }
//   };

//   /* ✅ Unblock User */
//   const handleUnblock = async (name) => {
//     try {
//       await axios.post(
//         `http://localhost:5000/api/unblock-user/${name}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchBlockedUsers();
//       alert(`${name} Unblocked`);
//     } catch (err) {
//       console.error("Unblock error:", err);
//     }
//   };

//   /* =============================== EXISTING CODE UNTOUCHED ===============================*/

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editUserId) {
//         await axios.put(
//           `http://localhost:5000/api/updateusers/${editUserId}`,
//           formData
//         );
//       } else {
//         await axios.post("http://localhost:5000/api/signup", formData);
//       }
//       fetchUsers();
//       setFormData({ name: "", email: "", password: "", role: "publisher" });
//       setEditUserId(null);
//     } catch (err) {
//       console.error("Error saving user:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/deleteuser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchUsers();
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   const handleEdit = (user) => {
//     setFormData({
//       name: user.name,
//       email: user.email,
//       password: "",
//       role: user.role || "publisher",
//     });
//     setEditUserId(user._id);
//   };

//   // Theme styling untouched
//   const isDark = theme === "dark";
//   const themeColors = {
//     containerBg: isDark ? "#1e293b" : "#fff",
//     headingColor: isDark ? "#e2e8f0" : "#082f3d",
//     borderColor: isDark ? "#334155" : "#ccc",
//     tableHeaderBg: isDark ? "#0f172a" : "#082f3d",
//     tableHeaderText: "#fff",
//     tableRowBg: isDark ? "#1e293b" : "#fff",
//     textColor: isDark ? "#e2e8f0" : "#333",
//   };

//   return (
//     <div
//       style={{
//         ...styles.container,
//         background: themeColors.containerBg,
//         color: themeColors.textColor,
//       }}
//     >
//       <h2 style={{ ...styles.heading, color: themeColors.headingColor }}>
//         👥 User Management
//       </h2>

//       {/* ✅ Existing Form */}
//       <form onSubmit={handleSubmit} style={styles.form}>
//         {/* existing untouched fields */}
//         ...
//       </form>

//       {/* ✅ Table with new column added */}
//       <div style={styles.tableWrapper}>
//         <table style={{ ...styles.table, borderColor: themeColors.borderColor }}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Email</th>
//               <th style={styles.th}>Role</th>
//               <th style={styles.th}>Actions</th>
//               <th style={styles.th}>Block / Unblock</th> {/* ✅ NEW COLUMN */}
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => {
//               const blocked = isUserBlocked(user.name);

//               return (
//                 <tr key={user._id}>
//                   <td style={styles.td}>{user.name}</td>
//                   <td style={styles.td}>{user.email}</td>
//                   <td style={styles.td}>
//                     <span style={styles.roleBadge}>{user.role}</span>
//                   </td>

//                   <td style={styles.tdAction}>
//                     <button
//                       style={styles.editButton}
//                       onClick={() => handleEdit(user)}
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       style={styles.deleteButton}
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       🗑 Delete
//                     </button>
//                   </td>

//                   {/* ✅ Block/Unblock Column */}
//                   <td style={styles.td}>
//                     {blocked ? (
//                       <button
//                         style={{
//                           ...styles.blockButton,
//                           background: "#10b981",
//                         }}
//                         onClick={() => handleUnblock(user.name)}
//                       >
//                         ✅ Unblock
//                       </button>
//                     ) : (
//                       <button
//                         style={{
//                           ...styles.blockButton,
//                           background: "#ef4444",
//                         }}
//                         onClick={() => handleBlock(user.name)}
//                       >
//                         🚫 Block
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// /* ✅ Existing styles unchanged + added block button */
// const styles = {
//   container: {
//     width: "100%",
//     maxWidth: "100%",
//     padding: "30px",
//   },
//   heading: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
//   form: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", border: "2px solid #ddd" },
//   th: { padding: "12px", border: "1px solid #ccc", fontWeight: "600" },
//   td: { padding: "12px", border: "1px solid #ccc" },
//   tdAction: { padding: "12px", border: "1px solid #ccc" },
//   editButton: {
//     background: "#facc15",
//     padding: "6px 12px",
//     marginRight: "6px",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   deleteButton: {
//     background: "#ef4444",
//     padding: "6px 12px",
//     borderRadius: "4px",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   blockButton: {
//     padding: "6px 12px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     color: "#fff",
//     fontWeight: "600",
//   },
//   roleBadge: {
//     padding: "4px 10px",
//     borderRadius: "20px",
//     color: "#fff",
//   },
// };

// export default UserManagement;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeSettings/ThemeContext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "publisher",
  });
  const [editUserId, setEditUserId] = useState(null);

  const { theme } = useContext(ThemeContext);
  const token = JSON.parse(localStorage.getItem("jwt"))?.token;

  useEffect(() => {
    fetchUsers();
    fetchBlockedUsers();
  }, []);

  /* ✅ Fetch All Users */
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getallusers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  /* ✅ Fetch Blocked Users */
  const fetchBlockedUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blocked-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlockedUsers(res.data.blockedUsers || []);
    } catch (err) {
      console.error("Error fetching blocked users:", err);
    }
  };

  /* ✅ Check If Blocked */
  const isUserBlocked = (name) => {
    return blockedUsers.some((u) => u.username === name && u.blocked === true);
  };

  /* ✅ Block User */
  const handleBlock = async (name) => {
    try {
      await axios.post(
        `http://localhost:5000/api/block-user/${name}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBlockedUsers();
      alert(`${name} is Blocked`);
    } catch (err) {
      console.error(err);
    }
  };

  /* ✅ Unblock User */
  const handleUnblock = async (name) => {
    try {
      await axios.post(
        `http://localhost:5000/api/unblock-user/${name}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBlockedUsers();
      alert(`${name} is Unblocked`);
    } catch (err) {
      console.error(err);
    }
  };

  /* ✅ Existing form logic untouched */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUserId) {
        await axios.put(
          `http://localhost:5000/api/updateusers/${editUserId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/signup", formData);
      }
      fetchUsers();
      setFormData({ name: "", email: "", password: "", role: "publisher" });
      setEditUserId(null);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/deleteuser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditUserId(user._id);
  };

  /* ✅ ORIGINAL theme logic untouched */
  const isDark = theme === "dark";
  const themeColors = {
    containerBg: isDark ? "#1e293b" : "#fff",
    headingColor: isDark ? "#e2e8f0" : "#082f3d",
    borderColor: isDark ? "#334155" : "#ccc",
    tableHeaderBg: isDark ? "#0f172a" : "#082f3d",
    tableHeaderText: "#fff",
    tableRowBg: isDark ? "#1e293b" : "#fff",
    textColor: isDark ? "#e2e8f0" : "#333",
  };

  return (
    <div
      style={{
        ...styles.container,
        background: themeColors.containerBg,
        color: themeColors.textColor,
      }}
    >
      <h2 style={{ ...styles.heading, color: themeColors.headingColor }}>
        👥 User Management
      </h2>

      {/* ✅ Add/Edit Form unchanged */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{
            ...styles.input,
            background: isDark ? "#0f172a" : "#fff",
            color: themeColors.textColor,
            borderColor: themeColors.borderColor,
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{
            ...styles.input,
            background: isDark ? "#0f172a" : "#fff",
            color: themeColors.textColor,
            borderColor: themeColors.borderColor,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required={!editUserId}
          style={{
            ...styles.input,
            background: isDark ? "#0f172a" : "#fff",
            color: themeColors.textColor,
            borderColor: themeColors.borderColor,
          }}
        />

        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          style={{
            ...styles.select,
            background: isDark ? "#0f172a" : "#fff",
            color: themeColors.textColor,
            borderColor: themeColors.borderColor,
          }}
        >
          <option value="publisher">Publisher</option>
          <option value="advertiser">Advertiser</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={styles.addButton}>
          {editUserId ? "Update" : "Add"}
        </button>
      </form>

      {/* ✅ TABLE with new Block/Unblock column */}
      <div style={styles.tableWrapper}>
        <table style={{ ...styles.table, borderColor: themeColors.borderColor }}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
              <th style={styles.th}>Block / Unblock</th> {/* ✅ NEW */}
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const blocked = isUserBlocked(user.name);

              return (
                <tr key={user._id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.roleBadge,
                        backgroundColor:
                          user.role === "admin"
                            ? "#2563eb"
                            : user.role === "advertiser"
                            ? "#10b981"
                            : "#f59e0b",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td style={styles.tdAction}>
                    <button
                      style={styles.editButton}
                      onClick={() => handleEdit(user)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(user._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>

                  {/* ✅ NEW COLUMN BLOCK/UNBLOCK */}
                  <td style={styles.td}>
                    {blocked ? (
                      <button
                        style={{
                          ...styles.blockButton,
                          background: "#10b981",
                        }}
                        onClick={() => handleUnblock(user.name)}
                      >
                        ✅ Unblock
                      </button>
                    ) : (
                      <button
                        style={{
                          ...styles.blockButton,
                          background: "#ef4444",
                        }}
                        onClick={() => handleBlock(user.name)}
                      >
                        🚫 Block
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ✅ ORIGINAL styles + block button added */
const styles = {
  container: {
    width: "100%",
    maxWidth: "100%",
    margin: 0,
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
    fontFamily: "Inter, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  addButton: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: "600",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "2px solid #ddd",
    minWidth: "600px",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ccc",
    fontWeight: "600",
  },
  td: {
    padding: "12px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  tdAction: {
    padding: "12px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  editButton: {
    background: "#facc15",
    padding: "6px 12px",
    marginRight: "6px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#ef4444",
    padding: "6px 12px",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  blockButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "600",
  },
  roleBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
};

export default UserManagement;
