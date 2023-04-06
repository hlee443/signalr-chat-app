# ChatApp

ChatApp is a real-time chat application built with React, SignalR, and ASP.NET Core. Users can join channels to send and receive messages.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)

## Features

- Real-time chat with SignalR
- Create and join channels
- Send and receive messages
- Set username

## Technologies Used

- React
- SignalR
- ASP.NET Core

## Installation

```
git clone https://github.com/yourusername/ChatApp.git
```

Install required packages:

Frontend:

```
cd chatapp-client
yarn install
```

Backend:

```
cd ChatAppServer
dotnet restore
```

Set up the database and modify the connection string in `ChatAppServer/program.cs`:

```csharp
builder.Services.AddDbContext<ChatAppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## Usage

Start the frontend:

```
cd chatapp-client
yarn dev
```

Start the backend:

```
cd ChatAppServer
dotnet run
```

Open the browser and navigate to the React frontend URL.

## Configuration

Update the database connection string in `ChatAppServer/program.cs`.

Configure CORS policy in `ChatAppServer/program.cs` with your React frontend URL:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("your-frontend-url")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
\`\`\`
