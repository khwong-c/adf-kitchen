import {AbstractMentionResource,} from "@atlaskit/mention/resource";

const fakeUserList = [
    {
        id: "user-fugu",
        name: "Fugu Fish",
    },
    {
        id: "user-tuna",
        name: "Tuna Sashimi",
    },
    {
        id: "{user_id}",
        name: "{user_name}",
    }
]


export class StubMentionResource
    extends AbstractMentionResource {
    constructor() {
        super();
    }

    /**
     * Create a client to your mention provider
     */
    filter(query?: string): void {
        const filteredUsers = fakeUserList.filter(user => user.name.toLowerCase().includes(query?.toLowerCase() || ''));
        this._notifyListeners({mentions: filteredUsers, query: query || ''}, {});
        this._notifyAllResultsListeners({mentions: filteredUsers, query: query || ''});
        return;
    }
}


export const stubMentionProvider = new StubMentionResource();
