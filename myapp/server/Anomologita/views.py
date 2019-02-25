from .models import User,Post,Profile,Comment
from .serializers import PostSerializer,CommentSerializer,UserSerializer,UserProfileSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly 

def index(request,path=''):
	if (path.endswith('.js')):
		return views.serve(request,path)
	else:
		return views.serve(request, 'index.html')
'''
class UserList(generics.ListCreateAPIView):
	serializer_class = UserSerializer

	def get_queryset(self):
		queryset = User.objects.all()
		username = self.request.query_params.get('username',None)
		if username is not None:
			queryset = queryset.filter(username__contains=username)
		return queryset


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
'''


class PostViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing post instances.
    """
    #permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class CommentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing commnet instances.
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer

class CommentCreateView(generics.CreateAPIView):

	#permission_classes = (IsAuthenticatedOrReadOnly,)
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
''' 
class PostListView(generics.ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

class PostCreateView(generics.CreateAPIView):

	permission_classes = (IsAuthenticatedOrReadOnly,)
	queryset = Post.objects.all()
	serializer_class = PostSerializer
'''


'''

class PostDetailView(generics.RetrieveAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

class PostListView(generics.ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

class PostCreateView(generics.CreateAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

class PostUpdateView(generics.UpdateAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer


class PostDeleteView(generics.DestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

#POST VIEWS
class PostListView(generics.ListCreateAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

class PostCreateView(generics.CreateAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer


class PostUpdateView(generics.UpdateAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer


class PostDeleteView(generics.DestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer

'''