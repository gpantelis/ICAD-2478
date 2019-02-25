from rest_framework import serializers

#from rest_auth.registration.serializers import RegisterSerializer
from allauth.account import app_settings as allauth_settings
from allauth.utils import get_username_max_length
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from django.contrib.auth.models import User
from .models import Profile,Post,Comment

'''
class UserSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField(many=True)

	class Meta:
		model = User
		fields = ('id','username','password','department','user')
'''

class PostSerializer(serializers.ModelSerializer):
	username = serializers.ReadOnlyField(source='user.username')
	#department = serializers.ReadOnlyField(source='user.department')
	#date_of_birth = serializers.ReadOnlyField(source='user.date_of_birth')
	class Meta:
		model = Post

		fields = ('id','title','text','post_date','user','username')
		#depth = 1
#ΓΙΝΕΤΑΙ ΕΔΩ ΝΑ ΠΕΡΝΑΩ ΚΑΙ ΤΟ ΟΝΟΜΑ ΤΟΥ ΧΡΗΣΤΗ?


class CommentSerializer(serializers.ModelSerializer):
	
	username = serializers.ReadOnlyField(source='user.username')
	class Meta:
		model = Comment
		fields = ('id','user','post','username','text')



class MyRegisterSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED
    )
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    department = serializers.CharField(required=True,write_only=True)
    date_of_birth = serializers.IntegerField(required=True,write_only=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(("The two password fields didn't match."))
        return data

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        print('validated_data ' , self.validated_data.get('username'))
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'department': self.validated_data.get('department', ''),
            'date_of_birth': self.validated_data.get('date_of_birth', ''),
            'email': self.validated_data.get('email', '')

        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        profile = Profile()
        profile.user = user
        profile.department = self.cleaned_data.get('department')
        profile.date_of_birth = self.cleaned_data.get('date_of_birth')
        profile.save()
        print('Profile saved: ', profile)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password','email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print('--------------------------------------***************************----------------------')
        return User.objects.create_user(**validated_data)

class UserProfileSerializer(serializers.ModelSerializer):

	id = serializers.IntegerField(source = 'pk', read_only = True)
	username = serializers.CharField(source = 'user.username')
	email = serializers.CharField(source = 'user.email')
	first_name = serializers.CharField(source = 'user.first_name')
	last_name = serializers.CharField(source = 'user.last_name')
	date_of_birth = serializers.IntegerField()
	department = serializers.CharField()

	class Meta:
		model = Profile
		fields = (
		        'id', 'username', 'email', 'first_name', 'last_name',
		        'date_of_birth', 'department',
		)
		#read_only_fields = ('date_of_birth', 'department',)

		def update(self, instance, validated_data):
		    print('--------------------------------------')
		    # First, update the User
		    user_data = validated_data.pop('user', None)
		    for attr, value in user_data.items():
		            setattr(instance.user, attr, value)

		    # Then, update UserProfile
		    for attr, value in validated_data.items():
		        setattr(instance, attr, value)
		    instance.save()
		    return instance

		def create(self, validated_data):
			    """
			    Overriding the default create method of the Model serializer.
			    :param validated_data: data containing all the details of student
			    :return: returns a successfully created student record
			    """
			    user_data = validated_data.pop('user')
			    user = UserSerializer.create(UserSerializer(), validated_data=user_data)
			    usuario, created = Profile.objects.update_or_create(user=user,**validated_data)
			    return usuario
'''
		def create(self, validated_data):
		    print('--------------------------------------***************************')
		    user_data = validated_data.pop('user')

		    user = User.objects.create(**user_data)

		    profile = Profile.objects.create(user = user, **validated_data)
		    return User(profile)
		    '''