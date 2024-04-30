import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import PostCardView from "../../components/PostCardView";

const PublicJournals = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    memory: "",
    image: null,
  });
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get("/post/all");
        console.log("Fetched posts:", response); // Log the fetched posts
        // Reversing as to get latest post on the top.
        response.reverse();
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submitted data to the array
    setSubmittedData([...submittedData, formData]);
    // Clear form data
    setFormData({ memory: "", image: null });
  };

  return (
    <DashboardLayout>
      <div>
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            <div className="journals-list-text">
              <h2>Share your memories</h2>
              <p>Write about your memory and attach a picture that reflects it.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                name="memory"
                value={formData.memory}
                onChange={handleChange}
                placeholder="Write your memory here..."
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button type="submit">Submit</button>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Memory</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.memory}</td>
                    <td>{data.image && <img src={URL.createObjectURL(data.image)} alt="Memory" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {posts.map((post, index) => (
                <PostCardView key={index} post={post} isPrivate={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PublicJournals;
