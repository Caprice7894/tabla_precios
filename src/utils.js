const query = (element) => document.querySelector(element)

const newElement = (element, parent, content = '') => {
	const node = document.createElement(element)
	node.innerHTML = content
	if (parent)
		parent.appendChild(node)
	return node
};

const elementToString = (element)=>{
	const template = document.createElement('div')
	template.appendChild(element)
	return template.innerHTML
}

export {query, newElement, elementToString}