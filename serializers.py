from rest_framework import serializers
from .models import User,Post

class UserSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField(many=True)


	class Meta:
		model = User
		fields = ('id','username','password','department','user')


class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields = ('id','title','text','post_date','user')