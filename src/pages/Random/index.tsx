import  { useState } from "react";
import { InputNumber, Button, Card, Typography, message } from "antd";



const { Title, Text } = Typography;

const Random = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState(null);
  const [attempts, setAttempts] = useState(10);
  const [feedback, setFeedback] = useState("");

  const handleGuess = () => {
    if (guess === null) {
      message.warning("Vui lòng nhập số dự đoán!");
      return;
    }

    if (attempts > 1) {
      if (guess < randomNumber) {
        setFeedback("Bạn đoán quá thấp!");
      } else if (guess > randomNumber) {
        setFeedback("Bạn đoán quá cao!");
      } else {
        setFeedback("Chúc mừng! Bạn đã đoán đúng!");
        message.success("Bạn đã đoán đúng!");
        return;
      }
      setAttempts(attempts - 1);
    } else {
      setFeedback(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
      message.error(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
    }
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(10);
    setGuess(null);
    setFeedback("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "20px" }}>
      {/* Khung trò chơi */}
      <Card style={{ width: 400, textAlign: "center" }}>
        <Title level={3}>Trò Chơi Đoán Số</Title>
        <Text>Nhập số từ 1 đến 100:</Text>
        <InputNumber
          min={1}
          max={100}
          value={guess}
          onChange={(value) => setGuess(value)}
          style={{ width: "100%", margin: "10px 0" }}
        />
        <Button type="primary" onClick={handleGuess} block>
          Dự đoán
        </Button>
        <Button onClick={resetGame} style={{ marginTop: 10 }} block>
          Chơi lại
        </Button>
        <Text style={{ display: "block", marginTop: 10 }}>Lượt còn lại: {attempts}</Text>
        <Text style={{ display: "block", marginTop: 10, fontWeight: "bold" }}>{feedback}</Text>
      </Card>

      {/* Hướng dẫn chơi */}
      <Card style={{ width: 300 }}>
        <Title level={4}>Hướng Dẫn</Title>
        <Text>- Hệ thống sẽ chọn một số từ 1 đến 100.</Text>
        <br />
        <Text>- Bạn có 10 lượt để đoán số đó.</Text>
        <br />
        <Text>- Sau mỗi lần đoán, hệ thống sẽ cho biết số đó lớn hơn hay nhỏ hơn.</Text>
        <br />
        <Text>- Nếu hết 10 lượt mà không đoán đúng, bạn sẽ thua.</Text>
      </Card>
    </div>
  );
};

export default Random;
