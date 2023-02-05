run:
    docker run -d -p 8080:8080 --name my-task my-task-image
run-dev:
    docker run -d -p 8080:8080 -v "/home/developer/Desktop/self-development/my-task:/app" -v /app/node_modules --rm --name my-task my-task-image
stop:
    docker stop my-task
