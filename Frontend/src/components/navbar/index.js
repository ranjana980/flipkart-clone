import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminNavbar from './admin-navbar'
import UserNavbar from './user-navbar'
import { getCurrentUserAction } from '../../entities/auth-reducer'

export default function Navbar() {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (userId) {
            const id = JSON.parse(userId)
            const onSuccess = (data) => {
                localStorage.setItem("userId", JSON.stringify(data?._id))
            }
            dispatch(getCurrentUserAction(id, onSuccess))
        }
    }, [])

    return (
        <>
            {user?.role === "admin" ? <AdminNavbar /> : <UserNavbar />}
        </>
    )
}
