# Generated by Django 3.2.6 on 2021-10-14 18:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studycom', '0003_cards_revieweddate'),
    ]

    operations = [
        migrations.AddField(
            model_name='cards',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='cards', to='studycom.user'),
            preserve_default=False,
        ),
    ]
