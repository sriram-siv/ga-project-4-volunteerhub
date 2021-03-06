from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=30)
    users = models.ManyToManyField(
        'jwt_auth.User',
        related_name='user_skills',
        blank=True
    )
    campaigns = models.ManyToManyField(
        'campaigns.Campaign',
        related_name='campaign_skills',
        blank=True
    )

    def __str__(self):
        return f'{self.name}'
