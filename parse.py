def taxa_file_labels(file_name):
    labels = []
    with open(file_name, 'r') as f:
        lines = f.read().splitlines()
        for row in lines:
            cols = row.split()
            if len(cols) > 0:
                num = cols[0]
                if num >= '0':
                    label = ' '.join(cols[1:])
                    replace = ['|', '*', '#']
                    for r in replace:
                        label = label.replace(r, '')
                    label = label.strip()
                    labels.append(label)
    return labels
