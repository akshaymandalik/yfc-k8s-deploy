Name: yfc-k8s-deploy
Summary: A full-stack MERN app (MongoDB, Express, React, Node) containerized with Docker and deployed on Kubernetes with an NGINX Ingress.
Architecture: 
<img width="1356" height="2760" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/bf7db58f-de4a-405b-8206-cadebfd86534" />

Tech Stack:
- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Containerization: Docker
- Container Management: Docker Compose
- Container Orchestration: Kubernetes (Minikube)
- Networking & Routing: NGINX Ingress Controller
- Version Control: Git, GitHub

Repository Structure: 

yfc-k8s-deploy/
├── backend/
│   ├── config/
│   │   └── .env
│   ├── controllers/
│   ├── models/
│   ├── routers/
│   ├── Dockerfile
│   └── app.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── k8s/
│   ├── 00-namespace.yaml
│   ├── 10-backend-deployment.yaml
│   ├── 20-backend-service.yaml
│   ├── 30-frontend-deployment.yaml
│   ├── 35-frontend-service.yaml
│   └── 40-ingress.yaml
│
├── docs/
│   └── architecture.md
│
├── docker-compose.yml
└── README.md

Prerequisites: 

Make sure the following tools and services are installed or configured before running the project.
- Docker: Used to build and run frontend and backend container images.
- Docker Compose: Used to manage multiple containers locally.
- Kubernetes (Minikube): Used to create and manage the local Kubernetes cluster.
- kubectl: Used to interact with the Kubernetes cluster and manage resources.
- MongoDB Atlas: Cloud-hosted MongoDB database used by the backend.
- Node.js: Version 20.x, used for the frontend and backend development.

Configuration: 
- Backend environment variables
    Create backend/config/.env:
        PORT= <your-backend-port-number>
        MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>
        JWTSECRETKEY=<your-secret-key>

- Frontend environment variables
    For Compose:
        Create frontend/.env:
            VITE_API_URL = http://localhost:<your-backend-port-number>
        While building the image for the frontend, pass --build-arg VITE_API_URL=<API_URL>
    For Kubernetes:
        No args/.env required, as the request falls back to /api.



