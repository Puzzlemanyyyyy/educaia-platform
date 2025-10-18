export interface MoodleCourseSummary {
  id: number;
  fullname: string;
  summary?: string;
}

export interface MoodleEnrollmentPayload {
  moodleUserId: number;
  moodleCourseId: number;
}
