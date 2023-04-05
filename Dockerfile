# Build React Vite frontend
FROM node:16 AS frontend-build
WORKDIR /app
COPY ./chatapp-client/package*.json ./
RUN npm install
COPY ./chatapp-client/ ./
RUN npm run build

# Build ASP.NET 7 backend
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS backend-build
WORKDIR /app
COPY ./ChatAppServer/*.csproj ./ChatAppServer/
RUN dotnet restore ./ChatAppServer/*.csproj

COPY ./ChatAppServer/ ./ChatAppServer/
COPY --from=frontend-build /app/dist ./ChatAppServer/wwwroot

RUN dotnet publish ./ChatAppServer/*.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=backend-build /app/out .
ENTRYPOINT ["dotnet", "ChatAppServer.dll"]
