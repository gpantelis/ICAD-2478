from django.db import models

class User(models.Model):
	username = models.CharField(max_length=150)
	password = models.CharField(max_length=250)
	date_of_birth = models.IntegerField('date of birth')
	department = models.CharField(max_length = 100)

	def __str__(self):
		return "%s - %s" % (self.username, self.department)

class Post(models.Model):
	user = models.ForeignKey(User,related_name='user',on_delete=models.CASCADE)
	title = models.CharField(max_length=200)
	text = models.TextField(default="")
	post_date = models.DateTimeField('post date')

	is_best = models.BooleanField(default = False)
	def user_of():
		return self.user

	def __str__(self):
		return "(%s %s) => %s" % (self.user, self.title,self.text)

class Comment(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	post = models.ForeignKey(Post,on_delete=models.CASCADE)
	text = models.TextField(default="")
	comment_date = models.DateTimeField('comment date')

	def __str__(self):
		return "%s %s %s" % (self.user, self.post, self.text)