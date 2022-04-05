import { CustomMoLang } from '../../custom/main'

test('Custom syntax', () => {
	const customMoLang = new CustomMoLang({})

	// customMoLang.parse(
	// 	`
	// 		# A basic custom class
	//         class('linked_list', {
	//             # Variables are accessible from outside of the class definition
	//             v.length = 0;
	//             # Temporary variables can only be accessed within the class definition
	//             t.first;

	//             # Functions declared within a class automatically become class methods
	//             function("add_first", "element", {
	//                 v.length = v.length + 1;

	//                 t.newfirst.element = arg.element;
	//                 t.newfirst.next = t.first;
	//                 t.first = t.newfirst;
	//                 return;
	//             });

	//             function("add_last", "element", {
	//                 v.length = v.length + 1;

	//                 t.curr = t.first;
	//                 loop(v.length - 1, {
	//                     t.curr = t.curr.next;
	//                 });
	//                 t.newele.element = arg.element;
	//                 t.curr = t.newele;
	//                 (!t.first) ? t.first = t.curr;
	//                 return;
	//             });

	//             function("get_element", "index", {
	//                 t.curr = t.first;
	//                 t.ele = t.curr.element;
	//                 loop(arg.index, {
	//                     t.curr = t.curr.next;
	//                     t.ele = t.curr.element;
	//                 });
	//                 return t.ele;
	//             });
	//         });

	//         # Usage:
	//         # v.list = class.linked_list();
	//         # q.log(v.list.length);
	//         # v.list.add_first(1);
	//         # q.log(v.list.length);
	//         # q.log(v.list.get_element(0));
	// 	`
	// )

	// expect(
	// 	customMoLang.transform(
	// 		'v.list = class.linked_list(); v.list.add_first(1); return v.list.get_element(0);'
	// 	)
	// ).toBe(`v.list.length=0;v.list.first=0;v.list.length=v.list.length+1;`)
})
