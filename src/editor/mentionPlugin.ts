import {AbstractMentionResource,} from "@atlaskit/mention/resource";

const fakeUserList = [
    {
        id: "user-fugu",
        name: "Fugu Fish",
    },
    {
        id: "user-tuna",
        name: "Tuna Sashimi",
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
        setTimeout(async () => {
            const filteredUsers = fakeUserList.filter(user => user.name.toLowerCase().includes(query?.toLowerCase() || ''));
            this._notifyListeners({mentions: filteredUsers, query: query || ''}, {});
            this._notifyAllResultsListeners({mentions: filteredUsers, query: query || ''});
        }, 30 + 1);
        return;
    }
}


export const stubMentionProvider = new StubMentionResource();
