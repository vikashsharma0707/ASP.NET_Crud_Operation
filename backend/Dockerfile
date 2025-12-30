# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# नेटवर्क इश्यू के लिए retry ऐड करो
RUN dotnet nuget locals all --clear

COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj" --source https://api.nuget.org/v3/index.json || dotnet restore "backend.csproj" --source https://api.nuget.org/v3/index.json
COPY . .
WORKDIR "/src"
RUN dotnet build "backend.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Final Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "backend.dll"]