def taxa_file_labels(file_name):
    pos = []
    neg = []
    with open(file_name, 'r') as f:
        lines = f.read().splitlines()
        for row in lines:
            cols = row.split()
            if len(cols) > 0:
                num = cols[0]
                label = ' '.join(cols[1:])
                replace = ['|', '*', '#']
                for r in replace:
                    label = label.replace(r, '')
                label = label.strip()
                if len(label) == 0:
                    continue
                elif num >= '0':
                    pos.append(label)
                else:
                    neg.append(label)

    return pos, neg
