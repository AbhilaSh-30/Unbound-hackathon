import { useEffect, useState } from "react";
import axios from "axios";

const FileRoutingPolicy = () => {
  const [rules, setRules] = useState([]);
  const [formData, setFormData] = useState({
    file_type: "",
    redirect_provider: "",
    redirect_model: "",
  });
  const [editingRuleId, setEditingRuleId] = useState(null);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/file-routing-rules`);
      setRules(res.data);
    } catch (error) {
      console.error("Error fetching file routing rules:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRuleId) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/file-routing-rules/${editingRuleId}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/file-routing-rules`, formData);
      }
      setFormData({ file_type: "", redirect_provider: "", redirect_model: "" });
      setEditingRuleId(null);
      fetchRules();
    } catch (error) {
      console.error("Error saving file routing rule:", error);
    }
  };

  const handleEdit = (rule) => {
    setFormData(rule);
    setEditingRuleId(rule.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/file-routing-rules/${id}`);
      fetchRules();
    } catch (error) {
      console.error("Error deleting file routing rule:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin File Routing Rules</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="file_type"
          placeholder="File Type"
          value={formData.file_type}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="redirect_provider"
          placeholder="Redirect Provider"
          value={formData.redirect_provider}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="redirect_model"
          placeholder="Redirect Model"
          value={formData.redirect_model}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editingRuleId ? "Update Rule" : "Add Rule"}
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">File Type</th>
            <th className="border p-2">Redirect Provider</th>
            <th className="border p-2">Redirect Model</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id} className="border">
              <td className="border p-2">{rule.file_type}</td>
              <td className="border p-2">{rule.redirect_provider}</td>
              <td className="border p-2">{rule.redirect_model}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(rule)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rule.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileRoutingPolicy;