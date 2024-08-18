from __future__ import with_statement
import sys
import os
import logging
from logging.config import fileConfig

from alembic import context

# Get the current directory and add it to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the create_app function from your application
from api import create_app

# This is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')

# Set up the Flask app context
app = create_app()
with app.app_context():
    # set the metadata object for 'autogenerate' support
    target_metadata = app.extensions['migrate'].db.metadata

    # other values from the config, defined by the needs of env.py,
    # can be acquired:
    # my_important_option = config.get_main_option("my_important_option")
    # ... etc.


    def run_migrations_offline():
        """Run migrations in 'offline' mode.
        This configures the context with just a URL
        and not an Engine, though an Engine is acceptable
        here as well.  By skipping the Engine creation
        we don't even need a DBAPI to be available.

        Calls to context.execute() here emit the given string to the
        script output.
        """
        url = config.get_main_option("sqlalchemy.url")
        context.configure(
            url=url,
            target_metadata=target_metadata,
            literal_binds=True,
            dialect_opts={"paramstyle": "named"},
        )

        with context.begin_transaction():
            context.run_migrations()


    def run_migrations_online():
        """Run migrations in 'online' mode.
        In this scenario we need to create an Engine
        and associate a connection with the context.
        """
        connectable = app.extensions['migrate'].db.engine

        with connectable.connect() as connection:
            context.configure(
                connection=connection,
                target_metadata=target_metadata,
            )

            with context.begin_transaction():
                context.run_migrations()


    if context.is_offline_mode():
        run_migrations_offline()
    else:
        run_migrations_online()
