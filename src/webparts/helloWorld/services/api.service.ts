import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users";

const LIST_TITLE = "Helpdesk";

export const User = {
  getCurrentUser: async () => await sp.web.currentUser.get()
};

export const Tickets = {
  getList: async () => {
    const list = sp.web.lists.getByTitle(LIST_TITLE);
    return await list.items
      .select("Id", "Title", "Status", "Author/Id, Author/Title")
      .expand("Author")
      .getAll();
  },
  getListForAuthor: async (id: number) => {
    const list = sp.web.lists.getByTitle(LIST_TITLE);
    return await list.items
      .filter(`AuthorId eq ${id}`)
      .select("Id", "Title", "Status", "Author/Id, Author/Title")
      .expand("Author")
      .getAll();
  },
  getItem: async (id: number) => {
    const list = sp.web.lists.getByTitle(LIST_TITLE);
    return await list.items
      .getById(id)
      .select("Title", "Comments", "Status", "EditorId", "AuthorId", "Versions")
      .expand("Versions")
      .get();
  },
  addItem: async (form) => {
    return await sp.web.lists
      .getByTitle(LIST_TITLE)
      .items.add(form);
  }
};
