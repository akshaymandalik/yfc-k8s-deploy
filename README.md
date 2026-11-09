yfc-k8s-deploy

A full-stack MERN application (MongoDB, Express, React, Node.js) containerized using Docker and deployed on Kubernetes with an NGINX Ingress Controller.

1. Architecture

<img width="1356" height="2760" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/fd9835c8-87f4-4a3e-8f1d-993a7b07230a" />


Request Flow

Users access the application through the configured domain.

The NGINX Ingress Controller receives incoming HTTP requests.

Ingress routes / requests to the frontend Service.

Ingress routes /api requests to the backend Service.

Kubernetes Services distribute traffic across the available frontend and backend Pods.

The backend communicates with MongoDB Atlas to retrieve and store application data.

2. Tech Stack

Frontend: React.js, Vite

Backend: Node.js, Express.js

Database: MongoDB Atlas

Containerization: Docker

Container Management: Docker Compose

Container Orchestration: Kubernetes (Minikube)

Networking & Routing: NGINX Ingress Controller

Version Control: Git, GitHub

3. Repository Structure

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

Directory Description

backend/ – Node.js and Express application containing controllers, models, routes, database configuration, and Dockerfile.

frontend/ – React application built with Vite, including static assets, NGINX configuration, and Dockerfile.

k8s/ – Kubernetes manifests for namespace, Deployments, Services, and Ingress configuration.

docs/ – Project documentation and architecture diagrams.

docker-compose.yml – Defines frontend and backend services for local containerized development.

README.md – Project overview, architecture, prerequisites, and setup instructions.

4. Prerequisites

Make sure the following tools and services are installed or configured before running the project.

Docker: Used to build and run frontend and backend container images.

Docker Compose: Used to manage multiple containers locally.

Kubernetes (Minikube): Used to create and manage the local Kubernetes cluster.

kubectl: Used to interact with the Kubernetes cluster and manage resources.

MongoDB Atlas: Cloud-hosted MongoDB database used by the backend.

Node.js: Version 20.x, used for frontend and backend development.

Version Verification

Check the installed versions using:

node --version
docker --version
docker compose version
minikube version
kubectl version --client

Node.js 20.11.1 was used during development. Record the exact versions of the remaining tools from your environment.

5. Configuration

5.1 Backend Environment Variables

Create a .env file inside backend/config/.

PORT=<your-backend-port-number>
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>
JWTSECRETKEY=<your-secret-key>

Variable

Description

PORT

Port on which the Express backend runs.

MONGO_URI

MongoDB Atlas connection string.

JWTSECRETKEY

Secret key used for JWT authentication.

5.2 Frontend Environment Variables

The frontend API URL depends on the deployment environment.

For Docker Compose

Create a .env file inside frontend/.

VITE_API_URL=http://localhost:<your-backend-port-number>

Pass the build argument in the frontend Docker build:

docker build \
  --build-arg VITE_API_URL=http://localhost:<your-backend-port-number> \
  -t yfc-frontend:latest ./frontend

Make sure the frontend Dockerfile declares and uses the build argument before running npm run build.

For Kubernetes

No frontend .env file or build argument is required when the application uses /api as its default API URL.

The frontend sends API requests to the same host using the relative /api path. The NGINX Ingress Controller routes those requests to the backend Service.

The backend Express routes must include the /api prefix for this routing configuration to work without an Ingress rewrite.

5.3 MongoDB Atlas Configuration

Create a MongoDB Atlas cluster.

Create a database user with appropriate permissions.

Configure Network Access to allow connections from your deployment environment.

Add the MongoDB connection string to the backend .env file.

5.4 Security Considerations

Do not commit .env files or credentials to GitHub.

Add environment files to .gitignore.

Do not include database credentials or JWT secrets in Docker images.

For production Kubernetes deployments, use Kubernetes Secrets or an external secret manager.
