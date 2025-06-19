from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer
from django.utils import timezone
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['date']
    search_fields = ['name', 'description', 'location']

    def get_queryset(self):
        queryset = super().get_queryset()
        filter_type = self.request.query_params.get('filter_type', None)
        today = timezone.now().date()

        if filter_type == 'upcoming':
            queryset = queryset.filter(date__gte=today)
        elif filter_type == 'past':
            queryset = queryset.filter(date__lt=today)
        return queryset

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()