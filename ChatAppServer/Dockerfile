FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ChatAppServer/ChatAppServer.csproj", "ChatAppServer/"]
RUN dotnet restore "ChatAppServer/ChatAppServer.csproj"
COPY . .
WORKDIR "/src/ChatAppServer"
RUN dotnet build "ChatAppServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ChatAppServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ChatAppServer.dll"]