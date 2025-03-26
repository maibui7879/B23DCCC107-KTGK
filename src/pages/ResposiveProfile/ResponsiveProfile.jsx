import React from "react";
import { Card, Avatar, Typography } from "antd";
import "./ResponsiveProfile.css"; // Import file CSS riêng

const { Title, Text } = Typography;

const ResponsiveProfile = () => {
  const name = "John Doe";
  const image = "logo.png";
  const description = "Software Engineer at XYZ";

  return (
    <Card className="profile-card">
      <Avatar src={image} alt={name} className="profile-avatar" />
      <div className="profile-info">
        <Title level={4}>{name}</Title>
        <Text type="secondary">{description}</Text>
      </div>
    </Card>
  );
};

export default ResponsiveProfile;
