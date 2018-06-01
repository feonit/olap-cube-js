import MemberList from "./MemberList";

describe('MemberList', () => {
	it('generation unique entity ID from exist entities if they have empty list', () => {
		const memberList = new MemberList();
		expect(memberList.reduceId()).toBe(1)
	});

	it('generation unique entity ID from exist entities if they have one or more elements', () => {
		const memberList = new MemberList([{id: 1}, {id: 3}]);
		expect(memberList.reduceId()).toBe(4)
	});
});