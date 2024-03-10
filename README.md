# Hotel Booking Backend

## Overview

The Hotel Booking Backend powers a dynamic application, hosted on an AWS Mumbai EC2 instance. It seamlessly integrates with a real-time NoSQL MongoDB database running on MongoDB Atlas, which is internally hosted on AWS Mumbai.

## Quick Start

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/uday510/hotel-booking-backend.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd hotel-booking-backend
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Start the Server:**
    ```bash
    npm start
    ```

## Architecture

- **AWS Mumbai EC2 Instance:**
  - Hosts the application, ensuring responsive user experiences.
  - Configured to run the Hotel Booking Backend code.

- **MongoDB Atlas Cluster:**
  - A real-time NoSQL MongoDB database hosted on MongoDB Atlas.
  - Internally hosted on AWS Mumbai, ensuring low-latency connections with the AWS EC2 instance.

- **Connection:**
  - The Hotel Booking Backend running on the AWS Mumbai EC2 instance connects seamlessly to the MongoDB Atlas cluster for data storage and retrieval.

## AWS Mumbai Hosting

- **AWS Mumbai EC2 Instance:**
  - The application is running on an EC2 instance in the Mumbai region of Amazon Web Services (AWS).
  - This geographical proximity enhances overall system performance and responsiveness.

- **MongoDB Atlas Cluster:**
  - The MongoDB Atlas cluster is internally hosted on AWS Mumbai, ensuring optimal data transfer speeds between the backend and the database.

## Documentation

Explore the API endpoints and integration details in the [Postman Collection](https://documenter.getpostman.com/view/18252587/2sA2xh3DRZ).

## Contact

For questions or suggestions, reach out to:

- GitHub: [uday510](https://github.com/uday510)

## License

This project is licensed under the [Apache License 2.0](LICENSE).

Thank you for choosing the Hotel Booking Backend! We hope it serves as a robust foundation for your hotel booking application.

---

**[Full API Documentation](https://documenter.getpostman.com/view/18252587/2sA2xh3DRZ)**
