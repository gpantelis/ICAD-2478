from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Profile, Post, Comment



class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'profile'
    fk_name = 'user'

# Define a new User admin
class ProfileUserAdmin(UserAdmin):
    inlines = (ProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_department')
    list_select_related = ('profile', )

    def get_department(self, instance):
        return instance.profile.department
    get_department.short_description = 'Department'

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(ProfileUserAdmin, self).get_inline_instances(request, obj)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, ProfileUserAdmin)
#admin.site.register(User, Profile)
#admin.site.register(Profile)

admin.site.register(Post)
admin.site.register(Comment)
