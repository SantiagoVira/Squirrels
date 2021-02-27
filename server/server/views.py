from django.shortcuts import render

# Renders built react app
def client(request):
    return render(request, "static/index.html")
