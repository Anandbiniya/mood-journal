import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Calendar from "../../components/Calendar";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { useUserAuth } from "../../contexts/UserAuthContext";
import GraphView from "../../components/GraphView";
import { Button } from "react-bootstrap";


const Insights = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let userId = "";
      try {
        const authResponse = await axios.get("auth/get-user-by-email", {
          params: {
            email: user.email,
          },
        });
        userId = authResponse.data[0]._id;
      } catch (error) {
        console.log("Error fetching user by email", error);
      }
      try {
        const { data: response } = await axios.get("/post/get-posts-by-user", {
          params: {
            user_id: userId,
          },
        });
        setPosts(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [user.email]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleMindfulnessVoiceover = () => {
    speak(`Hello ${user.name}, let's practice mindfulness together. Start by taking a deep breath in through your nose, feeling the air fill your lungs. Hold for a moment, then exhale slowly through your mouth, releasing any tension or stress. Repeat this process several times, focusing on each breath and allowing yourself to relax deeply.`);
  };

  return (
    <>
      <DashboardLayout>
        <div>
          {loading && <div>Loading</div>}
          {!loading && (
            <>
              <h2 className="mt-3 mb-3">Track your feelings!</h2>
              <Row className="mb-5 mt-2">
                <Col xs={12} xl={8}>
                  <GraphView posts={posts} />
                </Col>
                <Col xs={12} xl={4} className="journals-list-text">
                  <h1>Mood Chart</h1>
                  <p>
                    This graph provides insights into your mood over a period of
                    time. Positive values on the graph indicate that the user
                    experienced a good mood, while negative values suggest a
                    not-so-good mood. By tracking these values, the you can gain
                    insights into your emotional well-being and identify any
                    patterns or triggers that may be impacting your mood.
                  </p>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={12} xl={4} className="journals-list-text">
                  <h1>Calendar</h1>
                  <p>
                    This calendar tracks your mood on a daily basis, with
                    red indicating a negative or bad mood, yellow representing a
                    neutral mood, and green indicating a positive or good mood.
                    By using these colors to represent your mood, you can
                    easily visualize patterns and trends in your emotional
                    well-being over time.
                  </p>
                </Col>
                <Col xs={12} xl={8}>
                  <Calendar posts={posts} />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={12}>
                  <h2>Practicing Mindfulness</h2>
                  <p>
                    Mindfulness involves being present in the moment and fully
                    engaging with your surroundings. It can help reduce stress
                    and anxiety, improve focus and concentration, and promote a
                    sense of calm and well-being. Here are some simple
                    mindfulness tips you can incorporate into your daily life:
                  </p>
                  <ul>
                    <li>Practice deep breathing exercises.</li>
                    <li>Take short breaks to observe your surroundings.</li>
                    <li>Engage in activities that bring you joy and relaxation.</li>
                    <li>Practice gratitude by focusing on things you're thankful for.</li>
                    <li>Try guided meditation or yoga.</li>
                    <li>Avoid multitasking and focus on one task at a time.</li>
                  </ul>
                  <Button onClick={handleMindfulnessVoiceover}>Start Mindfulness Exercise</Button>
                </Col>
              </Row>
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Insights;
