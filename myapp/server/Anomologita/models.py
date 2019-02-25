from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save,pre_delete
from django.dispatch import receiver


class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True,related_name = 'profile')
	print('ppppppppppppppppppppppppppppppppppppp')
	date_of_birth = models.IntegerField('date of birth')
	department = models.CharField(max_length = 100)
	
	def __str__(self):
			return "%s %s %s" % (self.user, self.date_of_birth,self.department)
'''
	@receiver(post_save, sender=User)
	def create_user_profile(sender, instance, created, **kwargs):
	    print('pppppppppppppppppppppppppppppppppppppaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
	    if created:
	        print('pppppppppppppppppppppppppppppppppppppaqaaaaaqaqaqaqaqaqaqaa')
	        Profile.objects.create(user=instance)

	@receiver(post_save, sender=User)
	def save_user_profile(sender, instance, **kwargs):
	    print('pppppppppppppppppppppppppppp322222222222222222222222222ppppppppp')
	    instance.profile.save()
'''
class Post(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	title = models.CharField(max_length=200)
	text = models.TextField(default="")
	post_date = models.DateTimeField('post date')

	is_best = models.BooleanField(default = False)
	def user_of():
		return self.user

	def __str__(self):
		return "(%s %s) => %s" % (self.user, self.title,self.text)

class Comment(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	post = models.ForeignKey(Post,on_delete=models.CASCADE)
	#postid = models.IntegerField(default = 0)
	text = models.TextField(default="")
	#comment_date = models.DateTimeField('comment date')

	def __str__(self):
		return "%s %s %s" % (self.user, self.post, self.text)