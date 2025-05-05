const URL = 'https://randomuser.me/api/?results=100&seed=fullstackio';

export const fetchContacts = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error('No contacts found');
    }
    return data.results.map(formatUser);
  } catch (error) {
    console.error(error.message);
    return [];  // Return an empty array in case of error
  }
};

export const fetchUserContact = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
    if (!response.ok) {
      throw new Error('Failed to fetch user contact');
    }
    const data = await response.json();
    return formatUser(data.results[0]);
  } catch (error) {
    console.error(error.message);
    return {};  // Return an empty object in case of error
  }
};

export const fetchRandomContact = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) {
      throw new Error('Failed to fetch random contact');
    }
    const data = await response.json();
    return formatUser(data.results[0]);
  } catch (error) {
    console.error(error.message);
    return {};  // Return an empty object in case of error
  }
};

const formatUser = (user) => {
  return {
    name: `${user.name.first} ${user.name.last}`,
    avatar: user.picture.large,
    phone: user.phone,
    email: user.email,
    cell: user.cell,
    favorite: Math.random() < 0.2, // Randomly assigning favorites
  };
};
