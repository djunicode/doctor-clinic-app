# A file for writing helper functions to be imported in views.py
# Prevent overcrowding in views.py(Go corona) and add all helper functions here
#Ignore this file for now

#Returns True if the newly added appointment intersects with a previous appointment, False otherwise
def check_intersection(all_appointments_of_a_day, start_time, end_time):
    print(type(start_time), type(all_appointments_of_a_day[0].start_time))
    segments = [(start_time, end_time)] #newly added
    for appointment in all_appointments_of_a_day:
        segments.append((appointment.start_time, appointment.end_time))

    segments.sort()
    for i in range(len(segments)-1):
        current = segments[i]
        next = segments[i+1]
        if(current[1] > next[0]):
            return True
        return False
