"use server"
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { createBooking, deleteBooking, getBooking, getBookings, getCabin, getGuest, updateBooking, updateGuest } from "./data-service";
import { redirect } from "next/navigation";

const nationalRegex = /^[a-zA-Z0-9]{6,12}$/

export async function signInAction() {
    await signIn("google",{redirectTo:"/account"});
}

export async function signOutAction() {
    await signOut({redirectTo:"/ "});
} 

export async function updateProfileAction(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in !");
    const id = session?.user?.guestId;

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");
    
    if (!nationalRegex.test(nationalID)) throw new Error("Please provide a valid national-ID")
    
    const updateData = {nationality,nationalID,countryFlag}
    
    await updateGuest(id, updateData);
    revalidatePath("/account/profile")
}

export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in !");

    const {guestId} = await getBooking(bookingId);    
    if (session?.user?.guestId !== guestId) throw new Error("You are not allowed to delete this booking");

    await deleteBooking(bookingId);
    revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in !");
    
    const numGuests = Number(formData.get("numGuests"));
    const observations = (formData.get("observations")).slice(0,1000);
    const bookingId = Number(formData.get("bookingId"));
    const { guestId } = await getBooking(bookingId);

    if (isNaN(numGuests) || isNaN(bookingId)) throw new Error("Number of guest or booking Id should be a numeric value");
    if (session?.user?.guestId !== guestId) throw new Error("You are not allowed to update this booking")

    const updateData = {numGuests,observations};
        
    await updateBooking(bookingId, updateData);

    revalidatePath(`/account/reservations/edit/${bookingId}`)
    revalidatePath("/account/reservations");
    redirect("/account/reservations");
}     

export async function createReservation(bookingData,formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in !");

    const allBookingData = {
        ...bookingData,
        numGuests:Number(formData.get("numGuests")),
        status: "unconfirmed",
        hasBreakfast: false,
        isPaid: false,
        observations: formData.get("observations").slice(0,1000),
        guestId: Number(session?.user?.guestId),
    }

    await createBooking(allBookingData);
    revalidatePath(`/cabins/${bookingData?.cabinId}`);
    redirect("/thankyou");
} 