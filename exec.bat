start /wait cmd /k node_modules\.bin\cypress run --record --key 10e834ca-e8dc-4dd3-a150-7ccf165fd15c --spec "cypress\integration\examples\RestApi\*.spec.*"
Taskkill /f /im cmd.exe 