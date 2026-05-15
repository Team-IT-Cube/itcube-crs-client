"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { endpoint } from "@/endpoints";
import { Course } from "@/interfaces/course";
import CourseCard from "./CourseCard";
import { Enrollment } from "@/interfaces/enrollment";

export default function CourseList({ courses }: { courses: Course[] }) {
    const { token, isAuthenticated } = useAuthStore();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [fetching, setFetching] = useState(true);

    const fetchEnrollments = useCallback(async () => {
        if (!isAuthenticated()) {
            setFetching(false);
            return;
        }

        try {
            const response = await fetch(endpoint.myEnrollments, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });

            const json = await response.json();
            setEnrollments(Array.isArray(json) ? json : (json.data ?? []));
        } catch {
            // тихая ошибка
        } finally {
            setFetching(false);
        }
    }, [token, isAuthenticated])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEnrollments();
    }, [fetchEnrollments])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    enrollment={enrollments.find(e => e.course_id === course.id)}
                    onEnroll={(newEnrollment) => setEnrollments(prev => [...prev, newEnrollment])}
                    fetching={fetching}
                />
            ))}
        </div>
    )
}