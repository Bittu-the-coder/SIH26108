import asyncio
import os
import sys
import hashlib
import secrets
from getpass import getpass

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.database import engine
from app.models.user import User, ApiKey
from app.utils.auth_utils import get_password_hash
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select

async def main():
    async with AsyncSession(engine) as session:
        print("--- SIH26108 Auth Seeding ---")
        print("1. Create User")
        print("2. Create API Key")
        choice = input("Select an option (1/2): ")
        
        if choice == '1':
            email = input("Email: ")
            
            result = await session.execute(select(User).where(User.email == email))
            if result.scalars().first():
                print(f"User {email} already exists.")
                return
                
            name = input("Name: ")
            role = input("Role (user/admin) [user]: ") or "user"
            password = getpass("Password: ")
            
            user = User(
                email=email,
                name=name,
                role=role,
                password_hash=get_password_hash(password)
            )
            session.add(user)
            await session.commit()
            print(f"User {email} created successfully!")
            
        elif choice == '2':
            name = input("Label for API Key (e.g. GeM Integration): ")
            raw_key = f"sk_sih_{secrets.token_urlsafe(32)}"
            key_hash = hashlib.sha256(raw_key.encode()).hexdigest()
            
            api_key = ApiKey(
                name=name,
                key_hash=key_hash
            )
            session.add(api_key)
            await session.commit()
            
            print("\n✅ API Key created successfully!")
            print(f"Key: {raw_key}")
            print("WARNING: Store this key now. It will not be shown again.")
        else:
            print("Invalid choice")

if __name__ == "__main__":
    asyncio.run(main())
