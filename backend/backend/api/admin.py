from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'time', 'location', 'due_date', 'reminder')
    list_filter = ('date', 'reminder')
    search_fields = ('name', 'description', 'location')