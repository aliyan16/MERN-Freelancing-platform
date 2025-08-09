import React from "react";
import { Routes,Route,Link } from "react-router-dom";
import LoginForm from './features/auth/loginForm'
import JobList from './features/jobs/jobList'
import CreateJob from './features/jobs/createJob'
import ChatWindow from '../components/chatWindow'


const App:React.FC=()=>{
    return(
        <>
        <div className="min-h-screen p-6">
            <header className="max-w-5xl mx-auto flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Freelance Marketplace</h1>
                <nav className="space-x-4">
                    <Link to="/" className="text-sm">Jobs</Link>
                    <Link to="/create" className="text-sm">Create Job</Link>
                    <Link to="/login" className="text-sm">Login</Link>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto">
                <Routes>
                    <Route path="/" element={<JobList />} />
                    <Route path="/create" element={<CreateJob />} />
                    <Route path="/chat/:roomId" element={<ChatWindow />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </main>
        </div>
        </>
    )
}