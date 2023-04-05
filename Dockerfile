# Build React Vite frontend
FROM node:16 AS frontend-build
WORKDIR /app
COPY ./chatapp-client/package*.json ./
RUN npm install
COPY ./chatapp-client/ ./
RUN npm run build

# Build ASP.NET 7 backend
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ChatAppServer/ChatAppServer.csproj", "ChatAppServer/"]
RUN dotnet restore "ChatAppServer/ChatAppServer.csproj"
COPY . .
WORKDIR "/src/ChatAppServer"
RUN dotnet build "ChatAppServer.csproj" -c Release -o /app/build

FROM build AS publish
COPY --from=frontend-build /app/dist ./wwwroot
RUN dotnet publish "ChatAppServer.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ChatAppServer.dll"]
