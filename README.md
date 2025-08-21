   
    <!-- This a small web application for display,edit,delete,create products using visually appealing and easy user friendly UI. -->


<!-- getting started -->
git clone https://github.com/your-username/product-app.git
cd product-app

<!-- backend setup  -->

cd backend
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

<!-- frontend -->
cd frontend
npm install
npm run dev


                                                <!-- tech stack -->

<!-- Frontend: -->

Built with Next.js (React framework)

Modern UI using Tailwind CSS / Material UI

API integration with Axios

Form validation & error handling

Responsive design

<!-- Backend: -->

Django & Django REST Framework (DRF)

RESTful API endpoints for products

Validation for fields like price, category, and name

SQLite/PostgreSQL database support