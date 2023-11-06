from django.core.management.base import BaseCommand
from hotel.models import Room
import random


class Command(BaseCommand):
    help = "Manage room count in db"

    def add_arguments(self, parser):
        parser.add_argument(
            "--delete",
            action="store_true",
            help="Delete all rooms from db.",
        )

    def handle(self, *args, **options):
        num = 20

        if options['delete']:
            Room.objects.all().delete()
            return


        cost_list = [x for x in range(1000, 15000, 500)]

        for x in range(num):
            room = Room(
                room_name=str(x+1),
                daily_cost=random.choice(cost_list),
                num_of_seats=random.randint(1, 7)
            )
            room.save()

        self.stdout.write(
            self.style.SUCCESS(f'Successfully generated {num} rooms!')
        )