from django.urls import re_path,path

from rest_framework.routers import SimpleRouter

from . import views

app_name = 'Anomologita'

urlpatterns = [	
	#re_path(r'(?P<pk>[0-9]+)/',views.PostDetailView.as_view()),
	#path('create/', views.PostCreateView.as_view()),
	#path('users2/', views.UserViewSet),
	#re_path(r'^users/(?P<pk>[0-9]+)/', views.UserDetail.as_view()),
	#re_path('create/',views.PostCreateView.as_view()),
	#re_path(r'(?P<pk>[0-9]+)/update',views.PostUpdateView.as_view()),
	#re_path(r'(?P<pk>[0-9]+)/delete',views.PostDeleteView.as_view()),
	#re_path('',views.PostListView.as_view()),
	#path('',views.PostListView.as_view()),
	path('users/',views.UserProfileListView.as_view()),
	path('comments/create',views.CommentCreateView.as_view()),
	#path('<pk>/update/',views.PostUpdateView.as_view()),
	#path('<pk>/delete/',views.PostDeleteView.as_view()),
	
	

]


router = SimpleRouter()

router.register(r'comments', views.CommentViewSet, basename='comments')
router.register(r'posts', views.PostViewSet, basename='posts')
router.register(r'user',views.UserProfileViewSet,basename='user')

#router.register(r'users2/',views.UserViewSet,basename='users2')
urlpatterns += router.urls
